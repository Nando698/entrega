import { Server } from "socket.io";
import { addMsg, getMsg } from "./DAOS/chat.dao.js";

const socket = (expressServer) => {
  const io = new Server(expressServer);

  io.on("connection", async (socket) => {
    console.log("Se conecto un usuario nuevo", socket.id);

    let arrayMsj = await getMsg();
    socket.emit("server:msgs", arrayMsj);

    socket.on("client:msg", async (msgInfo) => {
      await addMsg(msgInfo);
      let arrayMsj = await getMsg();
      socket.emit("server:msgs", arrayMsj);
    });
  });
};

export default socket;
