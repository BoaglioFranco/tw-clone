import { useQuery } from "react-query";
import { getUserLikes, getUserTwits } from "../services/user";
import { Twit } from "./Twit";

interface Props {
  feedType: "twits" | "likes";
  userId: number;
}

const UserTwits: React.FC<Props> = ({ feedType, userId }) => {
  console.log("userid", userId);
  const { data } = useQuery(["feed", userId, feedType], () =>
    feedType === "twits" ? getUserTwits(userId) : getUserLikes(userId)
  );
  return (
    <>
      {data?.data.map((t) => (
        <Twit twit={t} key={t.id} />
      ))}
    </>
  );
};

export default UserTwits;
