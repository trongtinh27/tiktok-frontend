import { useEffect, useState, useRef, useCallback } from "react";
import classNames from "classnames/bind";

import { useUser } from "~/contexts/UserContext";
import HomeItem from "~/components/HomeItem";
import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import * as videoService from "~/services/videoService";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);
  const { user } = useUser();
  const axiosInstance = useAxiosWithInterceptor();

  const isFetching = useRef(false); // Tránh gọi API nhiều lần

  const fetchApi = useCallback(
    async (page) => {
      if (isFetching.current) return;
      isFetching.current = true;

      const result = await videoService.getVideoFeed(axiosInstance, page);
      if (result?.status === 200) {
        setVideos((prevVideos) => [...prevVideos, ...result?.data]);
      }
      isFetching.current = false;
    },
    [axiosInstance]
  );

  useEffect(() => {
    fetchApi(0);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchApi(page);
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cx("content-container")}>
      {videos.map((videoData, index) => (
        <HomeItem
          key={videoData.id}
          shape={videoData.shape}
          video={videoData}
          page={page}
          setPage={setPage}
          isLast={index === videos.length - 1}
        />
      ))}
    </div>
  );
}

export default Home;
