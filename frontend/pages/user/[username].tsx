import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "react-query";
import { getProfile } from "../../services/user";

const Profile: NextPage = (props) => {
  const router = useRouter();
  const { username } = router.query;
  const { data } = useQuery(
    ["profile", username],
    () => getProfile(username as string),
    { enabled: !!username }
  );

  console.log(data?.data);

  return (
    <>
      <div>{JSON.stringify(data?.data, null, 2)}</div>
      <button
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
