import classNames from "classnames/bind";

import Video from "./Video";
import Content from "./Content";
import { useUser } from "~/contexts/UserContext";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import * as videoService from "~/services/videoService";

import styled from "./DetailVideo.module.scss";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(styled);

function DetailVideo() {
  const { username, videoId } = useParams();
  const [detailVideo, setDetailVideo] = useState();

  // UserContext
  const { user } = useUser();

  const axiosInstance = useAxiosWithInterceptor();

  const callApi = async (axiosInstance, username, videoId, userId) => {
    const api = await videoService.getVideoByUsernameAndVideoId(
      axiosInstance,
      username,
      videoId,
      userId
    );
    if (api?.status === 200) {
      setDetailVideo(api.data);
    } else {
      console.error(api);
    }
  };

  useEffect(() => {
    let userId = 0;
    if (user && user.id !== undefined) {
      userId = user.id;
    }
    callApi(axiosInstance, username, videoId, userId);
  }, [username, videoId, user]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className={cx("video-container")}>
        <Video video={detailVideo}></Video>
      </div>
      <div className={cx("content-container")}>
        <Content username={username} video={detailVideo}></Content>
      </div>
    </>
  );
}

export default DetailVideo;
