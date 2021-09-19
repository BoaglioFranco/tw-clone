import React from "react";
import { ITwit } from "../models/twit";
import stl from "../styles/Twit.module.scss";
import Image from "next/image";

interface Props {
  twit: ITwit;
}

export const Twit: React.FC<Props> = ({ twit }) => {
  return (
    <>
      <div className={stl.twitContainer}>
        <div className={stl.aside}>
          <Image
            className={stl.img}
            src={twit.author.pfp}
            alt="pfp"
            width={40}
            height={40}
            layout="fixed"
          />
        </div>
        <div className={stl.content}>
          <h4 className={`link ${stl.author}`}>@{twit.author.username}</h4>
          <p className={stl.text}>{twit.text}</p>
          <div>likes: {twit.likes}</div>
        </div>
      </div>
    </>
  );
};
