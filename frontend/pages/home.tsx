import { NextPage } from "next";
import { useQuery } from "react-query";
import { getAllTwits } from "../services/twits";
import { Twit } from "../components/Twit";
import styles from "../styles/Home.module.scss";
import { useAuthGuard } from "../hooks/useAuthGuard";

import dynamic from "next/dynamic";

//import createTwit with no ssr
const CreateTwit = dynamic(() => import("../components/CreateTwit"), {
  ssr: false,
});

const Home: NextPage = () => {
  useAuthGuard(true);
  const { data: twits } = useQuery("twits", getAllTwits);
  // console.log(twits);
  return (
    <div className={styles.container}>
      <div
        className={`${styles.header} has-background-primary has-text-white is-size-3`}
      >
        Tweeter
      </div>
      <div className={styles.content}>
        <CreateTwit />
        {twits?.data.map((t) => (
          <Twit key={t.id} twit={t} />
        ))}
      </div>
      <div className={styles.navbar}></div>
    </div>
  );
};

export default Home;
