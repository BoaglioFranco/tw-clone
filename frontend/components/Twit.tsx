import React from "react";
import { ITwit } from "../models/twit";
import styles from "../styles/Tweet.module.scss";
import Image from 'next/image'; 

interface Props {
  twit: ITwit;
}

export const Twit: React.FC<Props> = ({ twit }) => {
  return (
    <div>
      <h4>@{twit.author.username}</h4>
      <Image src={twit.author.pfp} alt="pfp" width={48} height={48} />
      <p>{twit.text}</p>
      <div>likes: {twit.likes}</div>
      <hr />
    </div>
  );
};
