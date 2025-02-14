export const profileApi = async (axiosInstance, accessToken) => {
  try {
    const res = await axiosInstance.get(`users/profile`, {
      hearders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    // Ném lại lỗi để có thể xử lý ở các phần khác
    return error;
  }
};

export const profileByUsernameApi = async (axiosInstance, username) => {
  try {
    const res = await axiosInstance.get(`users/get/${username}`);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const checkUsernameApi = async (axiosInstance, username) => {
  try {
    const res = await axiosInstance.get(
      `users/check-username?username=${username}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const editProfileApi = async (axiosInstance, editProfileForm) => {
  try {
    const res = await axiosInstance.post(`users/edit-profile`, editProfileForm);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const listFriendApi = async (axiosInstance, id) => {
  try {
    const res = await axiosInstance.get(`users/get-list-friend?id=${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
