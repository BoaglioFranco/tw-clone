import React, { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ITwit } from "../models/twit";
import { postTwit } from "../services/twits";
import Image from "next/image";
import { useStore } from "../store/store";
import stl from "../styles/CreateTweet.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Layout/Modal";

interface Props {}

const CreateTwit: React.FC<Props> = ({}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((text: string) => postTwit(text));
  const [text, setText] = useState("");
  const [isOpen, setOpen] = useState(false);
  const user = useStore((store) => store.user)!;

  const sendTwit = () => {
    mutation.mutate(text, {
      onSuccess: (res) => {
        setOpen(false);
        setText("");
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
    <>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {isOpen && (
          <Modal handleClose={() => setOpen(false)}>
            <div className={stl.header}>
              <Image
                className={stl.img}
                src={user.pfp}
                alt="pfp"
                width={40}
                height={40}
                layout="fixed"
              />
              <p className="link" style={{ fontSize: "1.1rem" }}>
                @{user.username}
              </p>
              <button
                className={`${stl.close}`}
                aria-label="close"
                onClick={() => setOpen(false)}
              > <i className="bi bi-x-lg"></i></button>
            </div>
            <section className="px-3 py-4">
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
            <div className="is-flex">
              <button className="button is-success ml-auto" onClick={sendTwit}>
                Send
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      {/* <div className={`modal ${isOpen ? "is-active" : null}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <Image
              className={stl.img}
              src={user.pfp}
              alt="pfp"
              width={40}
              height={40}
              layout="fixed"
            />
            <p className="link" style={{ fontSize: "1.1rem" }}>
              @{user.username}
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setOpen(false)}
            ></button>
          </header>
          
        </div>
      </div> */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`button is-primary ${stl.twBtn}`}
        onClick={() => setOpen(!isOpen)}
      >
        <span className="icon">
          <i className="bi bi-pen"></i>
        </span>
      </motion.button>
    </>
  );
};

export default CreateTwit;
