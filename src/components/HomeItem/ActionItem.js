import { useEffect, useState } from "react";
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
import { useUser } from "~/contexts/UserContext";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import * as videoService from "~/services/videoService";
import * as followService from "~/services/followService";
import useCheckLogin from "~/hooks/useCheckLogin";
import styles from "./HomeItem.module.scss";

const cx = classNames.bind(styles);

function ActionItem({ video }) {
  const checkLogin = useCheckLogin();
  // state
  const [follow, setFollow] = useState(video?.followStatus);
  const [likeVideo, setLikeVideo] = useState(video?.likeStatus);
  const [likeCount, setLikeCount] = useState(video?.likeCount);
  const [collectVideo, setCollectVideo] = useState(video?.collectStatus);
  const [collectCount, setCollectCount] = useState(video?.collectCount);
  // axiosInstance
  const axiosInstance = useAxiosWithInterceptor();

  // UserContext
  const { user } = useUser();

  const handleFollow = () => {
    checkLogin(async () => {
      const followRequest = {
        followerId: video.userId,
        followedId: user.id,
      };
      const callAddFollowApi = await followService.addFollow(
        axiosInstance,
        followRequest
      );

      if (callAddFollowApi.status === 200) {
        setFollow(callAddFollowApi.data.followStatus);
      }
      // setFollow((prevState) => !prevState);
    });
  };

  const handleLike = () => {
    checkLogin(async () => {
      const likeRequest = {
        userId: user.id,
        videoId: video.id,
      };
      const callLikeApi = await videoService.likeVideo(
        axiosInstance,
        likeRequest
      );
      if (callLikeApi.status === 200) {
        setLikeVideo(callLikeApi.data.likeStatus);
        setLikeCount(callLikeApi.data.countLike);
      } else {
        setLikeVideo(false);
      }
    });
  };

  const handleCollect = () => {
    checkLogin(async () => {
      const collectRequest = {
        userId: user.id,
        videoId: video.id,
      };
      const callCollectApi = await videoService.collectVideo(
        axiosInstance,
        collectRequest
      );
      if (callCollectApi.status === 200) {
        setCollectVideo(callCollectApi.data.collectStatus);
        setCollectCount(callCollectApi.data.countCollect);
      } else {
        setCollectVideo(false);
      }
    });
  };

  useEffect(() => {}, [
    likeCount,
    likeVideo,
    collectCount,
    collectVideo,
    follow,
  ]);

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
        {user?.id !== video?.userId && (
          <button
            className={cx("follow-button", follow && "follow")}
            onClick={handleFollow}
          >
            <div className={cx("follow-content")}>
              {follow ? <CheckIcon /> : <PlusFollowIcon />}
            </div>
          </button>
        )}
      </div>
      <button className={cx("button-item")}>
        <span role="button" className={cx("icon-wrapper")} onClick={handleLike}>
          {likeVideo ? <HeartIconActive /> : <HeartIcon />}
        </span>
        <strong className={cx("text")}>{likeCount}</strong>
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
        <strong className={cx("text")}>{collectCount}</strong>
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
