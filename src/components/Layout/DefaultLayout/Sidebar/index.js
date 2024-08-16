import classNames from "classnames/bind";
import style from "./Sidebar.module.scss";

const cx = classNames.bind(style);

function SideBar() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("scroll-container")}></div>
    </div>
  );
}

export default SideBar;
