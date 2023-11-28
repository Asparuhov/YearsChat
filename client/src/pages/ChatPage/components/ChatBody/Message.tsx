import { Box, styled } from "@mui/material";
import React from "react";

interface IMessageProps {
  message: string;
  sender: "you" | "friend";
}

const Message: React.FC<IMessageProps> = ({ message, sender }) => {
  return (
    <StyledMessageContainer>
      <StyledMessage
        sx={{
          backgroundColor: sender === "friend" ? "#daa520" : "blue",
          alignSelf: sender === "friend" ? "flex-start" : "flex-end",
          wordWrap: "break-word",
          wordBreak: "break-all",
        }}
      >
        {message}
      </StyledMessage>
    </StyledMessageContainer>
  );
};

export default Message;

const StyledMessageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  margin: "5px",
});

const StyledMessage = styled(Box)(({ theme }) => ({
  borderRadius: 15,
  fontSize: 23,
  display: "inline-block",
  padding: theme.spacing(1, 2),
  margin: "5px",
  color: "white",
}));
