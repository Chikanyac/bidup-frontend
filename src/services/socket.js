import { io } from "socket.io-client";

const SOCKET_URL = "https://api.bidup.co.zw"; // change to production later

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"]
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};
