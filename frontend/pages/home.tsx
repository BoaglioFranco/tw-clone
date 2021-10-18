import { NextPage } from "next";
import { useQuery } from "react-query";
import { getAllTwits } from "../services/twits";
import { Twit } from "../components/Twit";
import styles from "../styles/Home.module.scss";
import { useAuthGuard } from "../hooks/useAuthGuard";
import Header from "../components/Layout/Header";

import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";

//import createTwit with no ssr
const CreateTwit = dynamic(() => import("../components/CreateTwit"), {
  ssr: false,
});

const Home: NextPage = () => {
  useAuthGuard(true);
  const { data: twits } = useQuery("twits", getAllTwits);
  // console.log(twits);
  return (
    <Layout>
      <div className={styles.content}>
        {twits?.data.map((t) => (
          <Twit key={t.id} twit={t} />
        ))}
      </div>
      <CreateTwit />
    </Layout>
  );
};

export default Home;
