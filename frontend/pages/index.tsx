import type { NextPage } from "next";
import Login from "../components/Login";
import styles from "../styles/Login.module.scss";
import Link from "next/link";
import { useAuthGuard } from "../hooks/useAuthGuard";

const Index: NextPage = () => {
  useAuthGuard(false);
  return (
    <div className={styles.content}>
      <h2 className="is-size-1 has-text-weight-bold">
        Voice your thoughts. <br /> Join Tweeter
      </h2>
      <Login />
      <div className="has-text-centered">
        <Link href="/register">
          <a className={`is-size-6 has-text-grey has-text-centered mt-3 link`}>
            Dont have an account? Sign up
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Index;
