import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import {
  HeartIcon,
  HeartIconActive,
  CommentIcon,
  UnCollectIcon,
  CollectIcon,
  RePostIcon,
  EmbedIcon,
  ShareFriendIcon,
  FacebookIcon,
  LinkIcon,
} from "~/components/Icons";
import styles from "./VideoAcion.module.scss";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { useUser } from "~/contexts/UserContext";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import * as videoService from "~/services/videoService";
import useCheckLogin from "~/hooks/useCheckLogin";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function VideoAction({ video, commentCount, setCommentCount }) {
  const checkLogin = useCheckLogin();

  // if (!video) {
  //   return <div>Loading...</div>; // Hoặc một UI loading
  // }

  const [likeVideo, setLikeVideo] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [collectVideo, setCollectVideo] = useState(false);
  const [collectCount, setCollectCount] = useState(0);

  // axiosInstance
  const axiosInstance = useAxiosWithInterceptor();

  // UserContext
  const { user } = useUser();

  // Xử lý like video
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

  //   Xử lý lưu video
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

  // Đồng bộ dữ liệu khi `video` thay đổi
  useEffect(() => {
    if (video) {
      setLikeVideo(video.likeStatus);
      setLikeCount(video.likeCount);
      setCommentCount(video.commentCount);
      setCollectVideo(video.collectStatus);
      setCollectCount(video.collectCount);
    }
  }, [video]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("action-wrapper")}>
          <div className={cx("action-flex", "first")}>
            {/* Like */}
            <button className={cx("btn-action-item")} onClick={handleLike}>
              <span className={cx("icon")}>
                {likeVideo ? <HeartIconActive /> : <HeartIcon />}
              </span>
              <strong className={cx("text")}>{likeCount}</strong>
            </button>
            {/* Comment */}
            <button disabled className={cx("btn-action-item")}>
              <span className={cx("icon")}>
                <CommentIcon />
              </span>
              <strong className={cx("text")}>{commentCount}</strong>
            </button>
            {/* Collect */}
            <button className={cx("btn-action-item")} onClick={handleCollect}>
              <span className={cx("icon")}>
                {collectVideo ? <CollectIcon /> : <UnCollectIcon />}
              </span>
              <strong className={cx("text")}>{collectCount}</strong>
            </button>
          </div>
          <div className={cx("action-flex")}>
            {/* RePost */}
            <Tippy delay={[0, 100]} content="Đăng lại" placement="top">
              <Link to="#" className={cx("action-link")}>
                <span className={cx("link-icon")}>
                  <RePostIcon></RePostIcon>
                </span>
              </Link>
            </Tippy>
            {/* Embed */}
            <Tippy delay={[0, 100]} content="Nhúng" placement="top">
              <Link to="#" className={cx("action-link")}>
                <span className={cx("link-icon")}>
                  <EmbedIcon></EmbedIcon>
                </span>
              </Link>
            </Tippy>
            {/* ShareFriend */}
            <Tippy
              delay={[0, 100]}
              content="Chia sẽ với bạn bè"
              placement="top"
            >
              <Link to="#" className={cx("action-link")}>
                <span className={cx("link-icon")}>
                  <ShareFriendIcon></ShareFriendIcon>
                </span>
              </Link>
            </Tippy>
            {/* Facebook */}
            <Tippy
              delay={[0, 100]}
              content="Chia sẽ với Facebook"
              placement="top"
            >
              <Link to="#" className={cx("action-link")}>
                <span className={cx("link-icon")}>
                  <FacebookIcon></FacebookIcon>
                </span>
              </Link>
            </Tippy>
            {/* Link */}
            <Tippy delay={[0, 100]} content="Sao chép liên kết" placement="top">
              <Link to="#" className={cx("action-link")}>
                <span className={cx("link-icon")}>
                  <LinkIcon></LinkIcon>
                </span>
              </Link>
            </Tippy>
          </div>
        </div>
        <div className={cx("copy-link")}>
          <p className={cx("link-text")}>{window.location + ""}</p>
          <Button className={cx("btn-copy")}>Sao chép liên kết</Button>
        </div>
      </div>
    </>
  );
}

export default VideoAction;
