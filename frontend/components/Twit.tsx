import React from "react";
import { ITwit } from "../models/twit";
import stl from "../styles/Twit.module.scss";
import Image from "next/image";
import Link from 'next/link';

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
          <Link href={`/user/${twit.author.username}`}><a className={`link ${stl.author}`}>@{twit.author.username}</a></Link>
          <p className={stl.text}>{twit.text}</p>
          <div>likes: {twit.likes}</div>
        </div>
      </div>
    </>
  );
};
