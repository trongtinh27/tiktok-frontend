import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import User, { Videos } from "~/components/Profile";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

function Profile() {
  // const { nickname } = useParams();
  return (
    // {nickname}
    <div className={cx("user-container")}>
      <div className={cx("content")}>
        <div className={cx("center")}>
          <User></User>
          <Videos></Videos>
        </div>
      </div>
    </div>
  );
}

export default Profile;
