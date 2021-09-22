import React, { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ITwit } from "../models/twit";
import { postTwit } from "../services/twits";
import stl from "../styles/CreateTweet.module.scss";

interface Props {}

const CreateTwit: React.FC<Props> = ({}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((text: string) => postTwit(text));
  const [text, setText] = useState("");
  const [isToggle, setToggle] = useState(false);

  const sendTwit = () => {
    mutation.mutate(text, {
      onSuccess: (res) => {
        setToggle(false);
        setText('');
        queryClient.setQueryData("twits", (twits: any) => {
          return {
            ...twits,
            data: [res.data, ...twits.data],
          };
        });
      },
    });
  };

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 240) {
      setText(e.target.value);
    }
  };

  return (
    <div>
      <div className={`modal ${isToggle ? "is-active" : null}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">User info</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setToggle(false)}
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="m-1">
              <textarea
                className={`${stl.textarea} textarea p-2`}
                placeholder="Share your thoughts"
                value={text}
                onChange={(e) => handleText(e)}
                rows={3}
              ></textarea>
              <p className={stl.ch}>{text.length} / 240 </p>
            </div>
          </section>
          <footer className="modal-card-foot p-3">
            <button className="button is-success ml-auto" onClick={sendTwit}>
              Send
            </button>
          </footer>
        </div>
      </div>
      <a
        className={`button is-primary ${stl.twBtn}`}
        onClick={() => setToggle(!isToggle)}
      >
        <span className="icon">
          <i className="bi bi-pen"></i>
        </span>
      </a>
    </div>
  );
};

export default CreateTwit;
