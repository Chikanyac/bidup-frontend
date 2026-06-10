import { io } from "socket.io-client";

const SOCKET_URL = "https://api.bidup.co.zw";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true
    });
  }
  return socket;
};
