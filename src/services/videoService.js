import * as request from "~/ultis/httpRequest";

export const getAllVideo = async () => {
  try {
    const res = await request.get(`video/all`, {});
    // console.log("data: " + res);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
