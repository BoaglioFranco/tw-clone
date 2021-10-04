import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import UserTwits from "../../components/UserTwits";
import { followUser, getProfile, unfollowUser } from "../../services/user";
import stl from "../../styles/UserProfile.module.scss";

const Profile: NextPage = (props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { username } = router.query;
  const { data } = useQuery(
    ["profile", username],
    () => getProfile(username as string),
    { enabled: !!username }
  );
  const [feed, setFeed] = useState<"twits" | "likes">("twits");

  const mutation = useMutation((id: number) =>
    data?.data.isFollowing ? unfollowUser(id) : followUser(id)
  );

  const followHandler = () => {
    mutation.mutate(data?.data.id!, {
      onSuccess: () => {
        queryClient.setQueryData(["profile", username], (cache: any) => {
          //updating the cache after follow button press to reflect the current state
          cache.data.isFollowing = !cache.data.isFollowing;
          cache.data.followedBy = cache.data.isFollowing
            ? cache.data.followedBy + 1
            : cache.data.followedBy - 1;

          return cache;
        });
      },
    });
  };

  // console.log(data?.data);

  return (
    <>
      <div>{JSON.stringify(data?.data, null, 2)}</div>
      <button
        onClick={followHandler}
        className={`button ${
          data?.data.isFollowing ? "is-danger" : "is-success"
        } is-small`}
      >
        <span className="icon">
          <i className="bi bi-heart-fill"></i>
        </span>
        <span>{data?.data.isFollowing ? "Unfollow" : "Follow"}</span>
      </button>
      <div className="tabs is-fullwidth mt-3">
        <ul>
          <li>
            <a onClick={() => setFeed("twits")}>Twits</a>
          </li>
          <li>
            <a onClick={() => setFeed("likes")}>Likes</a>
          </li>
        </ul>
      </div>
      {data?.data.id && (
        <div className={stl.feed}>
          <UserTwits feedType={feed} userId={data.data.id} />
        </div>
      )}
    </>
  );
};

export default Profile;
