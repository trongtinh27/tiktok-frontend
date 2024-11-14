import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import HomeItem from "~/components/HomeItem";
import { useUser } from "~/contexts/UserContext";

import useAxiosWithInterceptor from "~/hooks/useAxiosWithInterceptor";
import * as videoService from "~/services/videoService";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
  const [videos, setVideos] = useState([]);
  // const [loading, setLoading] = useState(false);
  // UserContext
  const { user } = useUser();

  const axiosInstance = useAxiosWithInterceptor();

  useEffect(() => {
    let userId = user?.id;
    if (userId === undefined) {
      userId = 0;
    } else {
      userId = user?.id;
    }

    console.log(userId);
    const fetchApi = async () => {
      // setLoading(true);

      const result = await videoService.getAllVideo(axiosInstance, userId);
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
