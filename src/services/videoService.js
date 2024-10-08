export const getAllVideo = async (axiosInstance) => {
  try {
    const res = await axiosInstance.get(`video/all`);
    // console.log("data: " + res);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
