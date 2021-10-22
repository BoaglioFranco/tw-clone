import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import {  useQuery, useQueryClient } from "react-query";
import Layout from "../../components/Layout/Layout";
import ProfileArea from "../../components/ProfileArea";
import UserTwits from "../../components/UserTwits";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { getProfile } from "../../services/user";
import stl from "../../styles/UserProfile.module.scss";

const Profile: NextPage = (props) => {
  useAuthGuard(true);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { username } = router.query;
  const { data, isError,status } = useQuery(
    ["profile", username],
    () => getProfile(username as string),
    { enabled: !!username, retry: false }
  );
  const [feed, setFeed] = useState<"twits" | "likes">("twits");
  

  useEffect(() => {
    if(isError){
      router.push("/home")
      // router.replace('./ho');
    }
  }, [isError, router])
  

  console.log(status);
  
  // console.log(data?.data);

  return (
    <Layout>
      {data?.data && <ProfileArea profile={data.data} />}
      {/* <div>{JSON.stringify(data?.data, null, 2)}</div> */}
      <div className="tabs is-fullwidth mt-2">
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
    </Layout>
  );
};

export default Profile;
