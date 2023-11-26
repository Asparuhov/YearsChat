import React from "react";
import { Grid, styled } from "@mui/material";
import ChatHeader from "./components/ChatHeader";
import * as io from "socket.io-client";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";

const socket = io.connect("http://localhost:4000");

const ChatPage = () => {
  return (
    <StyledChatComponent container spacing={2}>
      <ChatHeader roomId={15} />
      <ChatBody>
        <p>hey</p>
      </ChatBody>
      <ChatFooter />
    </StyledChatComponent>
  );
};

export default ChatPage;

const StyledChatComponent = styled(Grid)({
  maxWidth: 500,
  margin: "0 auto",
});
