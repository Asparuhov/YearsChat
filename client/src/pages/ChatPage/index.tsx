import React, { useEffect } from "react";
import { Grid, styled } from "@mui/material";
import { ChatHeader } from "./chat-layout/ChatHeader";
import { ChatBody } from "./chat-layout/ChatBody";
import { ChatFooter } from "./chat-layout/ChatFooter";
import { Message } from "./chat-layout/ChatBody/Messages";
import { v4 as uuidv4 } from "uuid";
import { useMessageContext } from "../../MessagesContext";
import { IMessageData } from "../../MessagesContext";

interface IChatPageProps {
  username: string;
  roomId: string;
}

export const ChatPage: React.FC<IChatPageProps> = ({ username, roomId }) => {
  const { messageList, setMessageList, socket } = useMessageContext();

  const formattedTime: string =
    new Date().getHours().toString().padStart(2, "0") +
    ":" +
    new Date().getMinutes().toString().padStart(2, "0");

  const sendMessage = async (message: string) => {
    if (message !== "") {
      const messageData: IMessageData = {
        id: uuidv4(),
        roomId,
        username,
        message,
        time: formattedTime,
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket, setMessageList]);

  return (
    <StyledChatComponent container spacing={2}>
      <ChatHeader roomId={roomId} />
      <ChatBody>
        {[...new Set(messageList)].map((message) => {
          return (
            <Message
              id={message.id}
              sender={username === message.username ? "you" : "friend"}
              message={message.message}
              username={message.username}
              time={message.time}
            />
          );
        })}
      </ChatBody>
      <ChatFooter sendMessage={sendMessage} />
    </StyledChatComponent>
  );
};

const StyledChatComponent = styled(Grid)({
  maxWidth: 500,
  margin: "0 auto",
  border: "1px solid rgb(133, 133, 133)",
});