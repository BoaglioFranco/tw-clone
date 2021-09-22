import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
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
    </>
  );
};

export default Profile;
