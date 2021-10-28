import React from "react";
import { ITwit } from "../models/twit";
import stl from "../styles/Twit.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { likeTwit } from "../services/twits";
interface Props {
  twit: ITwit;
  queryKey?: any;
}

export const Twit: React.FC<Props> = ({ twit, queryKey = 'twits'}) => {
  const queryClient = useQueryClient();
  const likeMutation = useMutation((twitId: number) => likeTwit(twitId));

  const onLike = () => {
    likeMutation.mutate(twit.id, {
      onSuccess: () => {
        queryClient.setQueryData(queryKey, (cache: any) => {
          const tw = (cache.data as ITwit[]).find((t) => t.id === twit.id)!;
          tw.hasLiked = !tw.hasLiked;
          tw.likes = tw.hasLiked ? tw.likes + 1 : tw.likes - 1;
          return cache;
        });
      },
    });
  };

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
          <Link href={`/user/${twit.author.username}`}>
            <a className={`link ${stl.author}`}>@{twit.author.username}</a>
          </Link>
          <p className={stl.text}>{twit.text}</p>
          <div className={stl.panel}>
            <div
              className={`${stl.panelItem} ${twit.hasLiked ? stl.active : ""}`}
              onClick={onLike}
            >
              <div className={stl.icon}>
                <i className={`bi bi-heart${twit.hasLiked ? "-fill" : ""}`}></i>
              </div>
              <span>{twit.likes}</span>
            </div>
          </div>
          <time className={stl.time}>
            {new Date(twit.createdAt).toLocaleDateString()}{" "}
            {new Date(twit.createdAt).toLocaleTimeString()}
          </time>
        </div>
      </div>
    </>
  );
};
