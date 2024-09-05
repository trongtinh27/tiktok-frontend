import * as request from "~/ultis/httpRequest";

export const loginApi = async (account, password) => {
  try {
    const res = await request.post(`auth/login`, {
      account: account,
      password: password,
    });
    return res;
  } catch (error) {
    // Ném lại lỗi để có thể xử lý ở các phần khác
    throw error;
  }
};

export const registerApi = async (isEmail, birthday, account, password) => {
  try {
    const res = await request.post(`auth/register`, {
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

export const profileApi = async (token) => {
  try {
    const res = await request.get(`auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    // Ném lại lỗi để có thể xử lý ở các phần khác
    return error;
  }
};
