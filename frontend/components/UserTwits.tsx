import { useQuery } from "react-query";
import { getUserLikes, getUserTwits } from "../services/user";
import { Twit } from "./Twit";

interface Props {
  feedType: "twits" | "likes";
  userId: number;
}

const UserTwits: React.FC<Props> = ({ feedType, userId }) => {

  const { data } = useQuery(["feed", userId, feedType], () =>
    feedType === "twits" ? getUserTwits(userId) : getUserLikes(userId)
  );
  return (
    <>
      {data?.data.map((t) => (
        <Twit twit={t} key={t.id} queryKey={["feed", userId, feedType]} />
      ))}
    </>
  );
};

export default UserTwits;
