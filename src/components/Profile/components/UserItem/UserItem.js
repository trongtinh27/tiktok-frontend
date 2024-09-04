import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Image from "~/components/Image";
import Button from "~/components/Button";
import styles from "./UserItem.module.scss";

const cx = classNames.bind(styles);
function UserItem() {
  return (
    <div className={cx("container")}>
      <div className={cx("user-item")}>
        <Link to="/@klynbbi05" className={cx("info-link")}>
          <span className={cx("avatar-container")}>
            <Image
              src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/a229937203d193888cac7ba967db6865.jpeg?lk3s=a5d48078&nonce=79705&refresh_token=9425aa121652038a4a5e709f0ca9aa21&x-expires=1725015600&x-signature=dxnW7dt880WQitmv3eUZIX4pIaI%3D&shp=a5d48078&shcp=81f88b70"
              className={cx("avatar")}
            />
          </span>
          <div className={cx("user-info")}>
            <div className={cx("nickname-container")}>
              <span className={cx("nickname")}>Phở riêu cua m65</span>
            </div>
            <p className={cx("unique-id")}>klynbbi05</p>
          </div>
        </Link>
        <div className={cx("button-container")}>
          <div className={cx("button-wrapper")}>
            <Button className={cx("btn-user")}>Đang Follow</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
