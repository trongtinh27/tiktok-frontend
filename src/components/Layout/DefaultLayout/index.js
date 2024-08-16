import classNames from "classnames/bind";
import style from "./Default.module.scss";
import Header from "~/components/Layout/components/Header";
import SideBar from "./Sidebar";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <SideBar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
