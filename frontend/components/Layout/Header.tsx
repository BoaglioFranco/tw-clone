import stl from "../../styles/Header.module.scss";
import Link from "next/link";

interface Props {}

const Header: React.FC<Props> = (props) => {
  return (
    <div className={`${stl.container} has-background-primary has-text-white`}>
      <Link href="/home">
        <a className={stl.brand}>Tweeter</a>
      </Link>
    </div>
  );
};

export default Header;
