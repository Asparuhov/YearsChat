import React, { useEffect, useState } from "react";
import { Grid, styled } from "@mui/material";
import ChatHeader from "./components/ChatHeader";
import ChatBody from "./components/ChatBody/ChatBody";
import ChatFooter from "./components/ChatFooter";
import Message from "./components/ChatBody/Message";
import { Socket } from "socket.io-client";

interface IChatPageProps {
  username: string;
  roomId: string;
  socket: Socket;
}

interface IMessageData {
  roomId: string;
  username: string;
  message: string;
  time: string;
}

const ChatPage: React.FC<IChatPageProps> = ({ username, roomId, socket }) => {
  const [messageList, setMessageList] = useState<Array<IMessageData>>([]);

  const sendMessage = async (message: string) => {
    if (message !== "") {
      const messageData: IMessageData = {
        roomId,
        username,
        message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <StyledChatComponent container spacing={2}>
      <ChatHeader roomId={roomId} />
      <ChatBody>
        {[...new Set(messageList)].map((message) => {
          return (
            <Message
              sender={username === message.username ? "you" : "friend"}
              message={message.message}
            />
          );
        })}
      </ChatBody>
      <ChatFooter sendMessage={sendMessage} />
    </StyledChatComponent>
  );
};

export default ChatPage;

const StyledChatComponent = styled(Grid)({
  maxWidth: 500,
  margin: "0 auto",
  border: "1px solid rgb(133, 133, 133)",
});
