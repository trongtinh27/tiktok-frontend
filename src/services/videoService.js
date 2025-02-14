export const getAllVideo = async (axiosInstance, userId) => {
  try {
    const res = await axiosInstance.get(`video/all/${userId}`);
    // console.log("data: " + res);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getVideoFeed = async (axiosInstance, page) => {
  try {
    const res = await axiosInstance.get(`video/feed?page=${page}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getVideoByUser = async (axiosInstance, username) => {
  try {
    const res = await axiosInstance.get(`video/getByUser`, {
      params: {
        username,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getVideoByUsernameAndVideoId = async (
  axiosInstance,
  username,
  videoId,
  userId
) => {
  try {
    const res = await axiosInstance.get(
      `video/getByUsername&VideoId/${userId}`,
      {
        params: {
          username,
          videoId,
        },
      }
    );
    console.log("data: ", res);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const uploadVideo = async (axiosInstance, uploadVideoRequest) => {
  try {
    const res = await axiosInstance.post(`video/upload`, uploadVideoRequest);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const likeVideo = async (axiosInstance, likeRequest) => {
  try {
    const res = await axiosInstance.post(`video/like`, likeRequest);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const collectVideo = async (axiosInstance, collectRequest) => {
  try {
    const res = await axiosInstance.post(`video/collect`, collectRequest);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addView = async (axiosInstance, videoID) => {
  try {
    const res = await axiosInstance.post(`views/${videoID}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
