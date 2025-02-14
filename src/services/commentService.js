export const getComments = async (axiosInstance, videoId) => {
  try {
    const res = await axiosInstance.get(
      `http://localhost:8080/comments/get/${videoId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error loading comments:", error);
  }
};
