import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { followUser, getProfile, unfollowUser } from "../../services/user";

const Profile: NextPage = (props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { username } = router.query;
  const { data } = useQuery(
    ["profile", username],
    () => getProfile(username as string),
    { enabled: !!username }
  );

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
            ? cache.data.followedBy+ 1
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
    </>
  );
};

export default Profile;
