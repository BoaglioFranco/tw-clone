import { useQuery } from "react-query";
import { getUserTwits } from "../services/user";
import { Twit } from "./Twit";

interface Props {
  feedType: "twits" | "likes";
  userId: number;
}

const UserTwits: React.FC<Props> = ({ feedType, userId }) => {
    console.log('userid', userId);
  const { data } = useQuery(["feed", userId, feedType], () =>
    getUserTwits(userId)
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
