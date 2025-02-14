import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Image from "~/components/Image";
import styles from "./CommentItem.module.scss";

const cx = classNames.bind(styles);

function CommentItem({ comment }) {
  return (
    <>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <Link className={cx("avatar-container")}>
            <span shape="circle" className={cx("avatar")}>
              <Image
                className={cx("img-avt")}
                src={comment.avatarUser}
                fallback="https://via.placeholder.com/56x100"
              />
            </span>
          </Link>
          <div className={cx("comment-content")}>
            <Link
              to={`/@${comment.username}`}
              className={cx("user-link")}
              target="_blank"
            >
              <span>{comment.displayName}</span>
            </Link>

            <p className={cx("comment-text")}>
              <span>{comment.content}</span>
            </p>
            <p className={cx("sub-content")}>
              <span className={cx("comment-time")}>{comment.create_at}</span>
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
