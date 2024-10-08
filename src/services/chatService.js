export const createChatRoomApi = async (
  axiosInstance,
  senderId,
  receiverId
) => {
  try {
    const res = await axiosInstance.post(
      `messages/create-chat-room?userOneId=${senderId}&userTwoId=${receiverId}`
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getChatBoxApi = async (
  axiosInstance,
  senderId,
  receiverId,
  offset = 0,
  limit = 10
) => {
  try {
    const res = await axiosInstance.get(
      `messages/get-chat?senderId=${senderId}&receiverId=${receiverId}&offset=${offset}&limit=${limit}`
    );
    return res;
  } catch (error) {
    return error;
  }
};
