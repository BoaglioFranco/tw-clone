import React from "react";
import { IProfile } from "../models/userProfile";
import stl from "../styles/ProfileArea.module.scss";
import Image from "next/image";
import { useStore } from "../store/store";
import { useMutation, useQueryClient } from "react-query";
import { followUser, unfollowUser } from "../services/user";
import UserStat from "./Layout/UserStat";
import dateFormat from "dateformat";

interface Props {
  profile: IProfile;
}

const ProfileArea: React.FC<Props> = ({ profile }) => {
  // console.log('', profile);
  const queryClient = useQueryClient();
  const user = useStore((store) => store.user);
  const isLoggedUser = profile.id === user?.id;

  const mutation = useMutation((id: number) =>
    profile.isFollowing ? unfollowUser(id) : followUser(id)
  );

  const followHandler = () => {
    mutation.mutate(profile.id, {
      onSuccess: () => {
        queryClient.setQueryData(
          ["profile", profile.username],
          (cache: any) => {
            //updating the cache after follow button press to reflect the current state
            cache.data.isFollowing = !cache.data.isFollowing;
            cache.data.followedBy = cache.data.isFollowing
              ? cache.data.followedBy + 1
              : cache.data.followedBy - 1;

            return cache;
          }
        );
      },
    });
  };

  const formattedDate = dateFormat(new Date(profile.createdAt), "mmm dd yyyy");

  return (
    <>
      <div className={stl.background}>
        <div className={stl.pfp}>
          <Image
            src={profile.pfp}
            alt="profile picture"
            width={60}
            height={60}
            layout="fixed"
          />
        </div>
      </div>
      <div style={{ margin: "0 1rem" }}>
        <div className={stl.flex}>
          <span className={stl.username}>@{profile.username}</span>
          {isLoggedUser && (
            <button className={`button is-outlined is-small ${stl.btn}`}>
              <i className="bi bi-gear"></i>
            </button>
          )}
        </div>
        <div className={stl.joinDate}>
          <i className="bi bi-calendar-event"></i> Joined tweeter on{" "}
          {formattedDate}
        </div>

        <div className={stl.followersPanel}>
          <UserStat label={"Twits"}>{profile.twitAmount}</UserStat>
          <UserStat label={"Followers"}>{profile.followedBy}</UserStat>
          <UserStat label={"Following"}>{profile.following}</UserStat>
        </div>
        {!isLoggedUser && (
          <button
            onClick={followHandler}
            className={`button ${
              profile.isFollowing ? "is-danger" : "is-success"
            } is-small`}
          >
            <span className="icon">
              <i className="bi bi-heart-fill"></i>
            </span>
            <span>{profile.isFollowing ? "Unfollow" : "Follow"}</span>
          </button>
        )}
      </div>
    </>
  );
};

export default ProfileArea;
