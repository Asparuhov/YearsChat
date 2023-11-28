import React from "react";
import { Grid, Typography, styled } from "@mui/material";

interface IProps {
  roomId: string;
}

const ChatHeader: React.FC<IProps> = ({ roomId }) => {
  return (
    <StyledChatHeader item xs={12}>
      <Typography
        variant="h5"
        color="white"
        textAlign="center"
      >{`You are currently in room: ${roomId}`}</Typography>
    </StyledChatHeader>
  );
};

export default ChatHeader;

const StyledChatHeader = styled(Grid)({
  maxWidth: 500,
  height: 100,
  backgroundColor: "blue",
});
