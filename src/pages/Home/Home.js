import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import HomeItem from "~/components/HomeItem";

import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import * as videoService from "~/services/videoService";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
  const [videos, setVideos] = useState([]);
  // const [loading, setLoading] = useState(false);

  const axiosInstance = useAxiosWithInterceptor();

  useEffect(() => {
    const fetchApi = async () => {
      // setLoading(true);

      const result = await videoService.getAllVideo(axiosInstance);
      setVideos(result);

      // setLoading(false);
    };
    fetchApi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cx("content-container")}>
      {videos &&
        videos.map((videoData) => (
          <HomeItem
            key={videoData.id}
            shape={videoData.shape}
            video={videoData}
          />
        ))}
    </div>
  );
}

export default Home;
