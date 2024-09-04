import * as request from "~/ultis/httpRequest";

export const search = async (q, type = "less") => {
  try {
    const res = await request.get(`users/search`, {
      params: {
        q,
        type,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
