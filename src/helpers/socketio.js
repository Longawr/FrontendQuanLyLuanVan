import { io } from "socket.io-client";
import { UrlConstants } from "../constants";

export const socket = io(UrlConstants.BASE_URL); // Replace with your actual socket server URL
