import { useState } from "react";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";

import { Link } from "react-router-dom";
import {
  PlusFollowIcon,
  CheckIcon,
  HeartIcon,
  HeartIconActive,
  CommentIcon,
  UnCollectIcon,
  CollectIcon,
  ShareIcon,
  MoreHorizontalIcon,
  BottomArrowIcon,
  RePostIcon,
  EmbedIcon,
  ShareFriendIcon,
  FacebookIcon,
  LinkIcon,
} from "~/components/Icons";
import Image from "~/components/Image";

import styles from "./HomeItem.module.scss";

const cx = classNames.bind(styles);

function ActionItem({ video }) {
  const [follow, setFollow] = useState(false);
  const [likeVideo, setLikeVideo] = useState(false);
  const [collectVideo, setCollectVideo] = useState(false);

  const handleFollow = () => {
    setFollow((prevState) => !prevState);
  };

  const handleLike = () => {
    setLikeVideo((prevState) => !prevState);
  };

  const handleCollect = () => {
    setCollectVideo((prevState) => !prevState);
  };

  return (
    <div className={cx("action-item-container")}>
      <div className={cx("avatar-item")}>
        <Link to={`/@${video.username}`} className={cx("avatar-link")}>
          <div className={cx("avatar-container")}>
            <span role="button" shape="circle" className={cx("span-avatar")}>
              <Image className={cx("img-avatar")} src={video.userAvatar} />
            </span>
          </div>
        </Link>
        <button
          className={cx("follow-button", follow && "follow")}
          onClick={handleFollow}
        >
          <div className={cx("follow-content")}>
            {follow ? <CheckIcon /> : <PlusFollowIcon />}
          </div>
        </button>
      </div>
      <button className={cx("button-item")}>
        <span role="button" className={cx("icon-wrapper")} onClick={handleLike}>
          {likeVideo ? <HeartIconActive /> : <HeartIcon />}
        </span>
        <strong className={cx("text")}>{video.likeCount}</strong>
      </button>
      <button className={cx("button-item")}>
        <span role="button" className={cx("icon-wrapper")}>
          <CommentIcon />
        </span>
        <strong className={cx("text")}>{video.commentCount}</strong>
      </button>
      <button className={cx("button-item")}>
        <span
          role="button"
          className={cx("icon-wrapper")}
          onClick={handleCollect}
        >
          {collectVideo ? <CollectIcon /> : <UnCollectIcon />}
        </span>
        <strong className={cx("text")}>{video.collectCount}</strong>
      </button>
      <button className={cx("button-item")}>
        <div>
          <HeadlessTippy
            delay={[0, 300]}
            interactive
            render={(attrs) => (
              <div
                tabIndex="-1"
                {...attrs}
                className={cx("share-tippy-container")}
              >
                <BottomArrowIcon className={cx("share-tippy-icon")} />
                <div className={cx("share-wrapper")}>
                  <a href="/" className={cx("share-link")}>
                    <span className={cx("share-link-icon")}>
                      <RePostIcon />
                    </span>
                    <span className={cx("share-link-title")}>Đăng lại</span>
                  </a>
                  <a href="/" className={cx("share-link")}>
                    <span className={cx("share-link-icon")}>
                      <EmbedIcon />
                    </span>
                    <span className={cx("share-link-title")}>Nhúng</span>
                  </a>
                  <a href="/" className={cx("share-link")}>
                    <span className={cx("share-link-icon")}>
                      <ShareFriendIcon />
                    </span>
                    <span className={cx("share-link-title")}>
                      Gửi đến bạn bè
                    </span>
                  </a>
                  <a href="/" className={cx("share-link")}>
                    <span className={cx("share-link-icon")}>
                      <FacebookIcon />
                    </span>
                    <span className={cx("share-link-title")}>
                      Chia sẻ với Facebook
                    </span>
                  </a>
                  <a href="/" className={cx("share-link")}>
                    <span className={cx("share-link-icon")}>
                      <LinkIcon />
                    </span>
                    <span className={cx("share-link-title")}>
                      Sao chép liên kết
                    </span>
                  </a>
                </div>
              </div>
            )}
          >
            <span role="button" className={cx("icon-wrapper")}>
              <ShareIcon />
            </span>
          </HeadlessTippy>
        </div>
        <strong className={cx("text")}>1234</strong>
      </button>
      <button className={cx("button-item")}>
        <span role="button" className={cx("icon-wrapper")}>
          <MoreHorizontalIcon />
        </span>
      </button>
    </div>
  );
}

export default ActionItem;
