import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ITwit } from "../models/twit";
import { postTwit } from "../services/twits";
import stl from "../styles/CreateTweet.module.scss";

interface Props {}

const CreateTwit: React.FC<Props> = ({}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((text: string) => postTwit(text));
  const [text, setText] = useState("");

  const sendTwit = () => {
    mutation.mutate(text, {
      onSuccess: (res) => {
        queryClient.setQueryData("twits", (twits: any) => {
          return {
            ...twits,
            data: [res.data, ...twits.data],
          };
        });
      },
    });
  };

  return (
    <div className="m-1">
      <textarea
        className={`${stl.textarea} textarea p-2`}
        placeholder="Share your thoughts"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
      ></textarea>
      <div className={`${stl.options} mt-1`}>
        <button
          className={`${stl.button} button is-primary ml-auto`}
          onClick={sendTwit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CreateTwit;
