import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Image from "~/components/Image";
import styles from "./CommentItem.module.scss";

const cx = classNames.bind(styles);

function CommentItem() {
  return (
    <>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <Link className={cx("avatar-container")}>
            <span shape="circle" className={cx("avatar")}>
              <Image
                className={cx("img-avt")}
                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/048641c5a210f6b662ae2db0e1821667.jpeg?lk3s=a5d48078&nonce=42121&refresh_token=c799674b99b18d443e1029fed9936797&x-expires=1731823200&x-signature=AQppVkkXfxyidF1SvrzN5NGCZ4k%3D&shp=a5d48078&shcp=81f88b70"
                fallback="https://via.placeholder.com/56x100"
              />
            </span>
          </Link>
          <div className={cx("comment-content")}>
            <Link to="/@admin" className={cx("user-link")} target="_blank">
              <span>admin</span>
            </Link>

            <p className={cx("comment-text")}>
              <span dir>Test comment 123565765</span>
            </p>
            <p className={cx("sub-content")}>
              <span className={cx("comment-time")}>2 ngày trước</span>
              <span role="button" className={cx("reply")}>
                Trả lời
              </span>
            </p>
          </div>
          <div className={cx("action-container")}></div>
        </div>
      </div>
    </>
  );
}

export default CommentItem;
