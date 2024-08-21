import classNames from "classnames/bind";
import HomeItem from "~/components/HomeItem";

import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("content-container")}>
      <HomeItem shape="vertical"></HomeItem>
      <HomeItem shape="square"></HomeItem>
      <HomeItem shape="horizontal"></HomeItem>
    </div>
  );
}

export default Home;
