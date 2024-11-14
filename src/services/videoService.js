export const getAllVideo = async (axiosInstance, userId) => {
  try {
    const res = await axiosInstance.get(`video/all/${userId}`);
    // console.log("data: " + res);

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
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const collectVideo = async (axiosInstance, collectRequest) => {
  try {
    const res = await axiosInstance.post(`video/collect`, collectRequest);
    return res;
  } catch (error) {
    console.error(error);
  }
};
