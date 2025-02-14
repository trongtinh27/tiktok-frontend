export const loginApi = async (axiosInstance, account, password) => {
  try {
    const res = await axiosInstance.post(`auth/login`, {
      account: account,
      password: password,
    });
    return res;
  } catch (error) {
    // Ném lại lỗi để có thể xử lý ở các phần khác
    throw error;
  }
};

export const confirmLoginApi = async (axiosInstance, account, password) => {
  try {
    const res = await axiosInstance.post(`auth/confirmLogin`, {
      account: account,
      password: password,
    });
    return res;
  } catch (error) {
    // Ném lại lỗi để có thể xử lý ở các phần khác
    throw error;
  }
};

export const refreshTokenApi = async (axiosInstance) => {
  try {
    const res = await axiosInstance.post(`auth/refreshToken`, {});
    return res;
  } catch (error) {
    throw error;
  }
};

export const registerApi = async (
  axiosInstance,
  isEmail,
  birthday,
  account,
  password
) => {
  try {
    const res = await axiosInstance.post(`auth/register`, {
      isEmail: isEmail,
      birthday: birthday,
      account: account,
      password: password,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const logoutApi = async (axiosInstance, userId) => {
  try {
    const res = await axiosInstance.post(`auth/logout?id=${userId}`);
    return res;
  } catch (error) {
    return error;
  }
};
