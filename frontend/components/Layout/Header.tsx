import stl from "../../styles/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "../../store/store";

interface Props {}

const Header: React.FC<Props> = (props) => {
  const { pfp, username } = useStore((store) => store.user)!;
  return (
    <div className={`${stl.container} has-background-primary has-text-white`}>
      <Link href="/home">
        <a className={stl.brand}>Tweeter</a>
      </Link>

        <Link href={`/user/${username}`}>
          <a className={stl.imgContainer}>
            <Image
              className={stl.img}
              src={pfp}
              alt="pfp"
              width={36}
              height={36}
              layout="fixed"
            />
          </a>
        </Link>
    </div>
  );
};

export default Header;
