export const checkFollowApi = async (
  axiosInstance,
  followingId,
  followerId
) => {
  try {
    const res = await axiosInstance.get(
      `follow/checkFollowing?followingId=${followingId}&followerId=${followerId}`
    );
    return res;
  } catch (error) {
    // Ném lại lỗi để có thể xử lý ở các phần khác
    throw error;
  }
};

export const getListFollowingApi = async (
  axiosInstance,
  userId,
  offset,
  limit
) => {
  try {
    const res = await axiosInstance.get(
      `follow/get-list-following?id=${userId}&offset=${offset}&limit=${limit}`
    );

    return res;
  } catch (error) {
    return error;
  }
};
