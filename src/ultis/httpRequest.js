import axios from "axios";

const httpRequest = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "http://localhost:8080/",
});

export const get = async (path, options = {}) => {
  try {
    const response = await httpRequest.get(path, options);
    return response;
  } catch (error) {
    // Ném lỗi để có thể xử lý ở các phần khác
    return error;
  }
};

export const post = async (path, options = {}) => {
  try {
    const response = await httpRequest.post(path, options);

    return response;
  } catch (error) {
    // Ném lỗi để có thể xử lý ở các phần khác
    return error;
  }
};

export default httpRequest;
