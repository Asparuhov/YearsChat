import React, { useEffect } from "react";
import { Grid, styled } from "@mui/material";
import { ChatHeader } from "./chat-layout/ChatHeader";
import { ChatBody } from "./chat-layout/ChatBody";
import { ChatFooter } from "./chat-layout/ChatFooter";
import { Message } from "./chat-layout/ChatBody/Message";
import { v4 as uuidv4 } from "uuid";
import { useChatContext } from "../../ChatContext";
import { IMessageData } from "../../ChatContext";

interface IChatPageProps {
  username: string;
  roomId: string;
}

export const ChatPage: React.FC<IChatPageProps> = ({ username, roomId }) => {
  const { messageList, setMessageList, socket } = useChatContext();

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

  const deleteMessage = (messageId: string) => {
    setMessageList((prevMessageList) => {
      const messageIndex = prevMessageList.findIndex(
        (msg) => msg.id === messageId
      );

      if (messageIndex !== -1) {
        const updatedMessageList = [
          ...prevMessageList.slice(0, messageIndex),
          ...prevMessageList.slice(messageIndex + 1),
        ];
        return updatedMessageList;
      } else {
        return prevMessageList;
      }
    });
  };

  const editMessage = (editedMessage: string, messageId: string) => {
    setMessageList((prevMessageList) => {
      const messageIndex = prevMessageList.findIndex(
        (msg) => msg.id === messageId
      );

      if (messageIndex !== -1) {
        const updatedMessageList = [
          ...prevMessageList.slice(0, messageIndex),
          {
            ...prevMessageList[messageIndex],
            message: editedMessage,
          },
          ...prevMessageList.slice(messageIndex + 1),
        ];
        return updatedMessageList;
      } else {
        return prevMessageList;
      }
    });
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on("delete", (data) => {
      deleteMessage(data.messageId);
    });
    socket.on("edit", (data) => {
      editMessage(data.editedMessage, data.messageId);
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

const StyledChatComponent = styled(Grid)(({ theme }) => ({
  maxWidth: 355,
  margin: "0 auto",
}));
