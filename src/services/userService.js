export const profileApi = async (axiosInstance) => {
  try {
    const res = await axiosInstance.get(`users/profile`);

    return res;
  } catch (error) {
    // Ném lại lỗi để có thể xử lý ở các phần khác
    return error;
  }
};

export const profileByUsernameApi = async (axiosInstance, username) => {
  try {
    const res = await axiosInstance.get(`users/get/${username}`);

    return res;
  } catch (error) {
    return error;
  }
};

export const checkUsernameApi = async (axiosInstance, username) => {
  try {
    const res = await axiosInstance.get(
      `users/check-username?username=${username}`
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const editProfileApi = async (axiosInstance, editProfileForm) => {
  try {
    const res = await axiosInstance.post(`users/edit-profile`, editProfileForm);
    return res;
  } catch (error) {
    return error;
  }
};

export const listFriendApi = async (axiosInstance, id) => {
  try {
    const res = await axiosInstance.get(`users/get-list-friend?id=${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
