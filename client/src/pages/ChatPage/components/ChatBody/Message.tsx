import { Box, Typography, styled } from "@mui/material";
import React from "react";

interface IMessageProps {
  message: string;
  sender: "you" | "friend";
  username: string;
  time: string;
}

const Message: React.FC<IMessageProps> = ({
  message,
  sender,
  username,
  time,
}) => {
  return (
    <StyledMessageContainer>
      <Typography
        sx={{
          alignSelf: sender === "friend" ? "flex-start" : "flex-end",
          color: "grey",
          fontSize: 11,
          marginRight: sender === "you" ? 1.5 : 0,
          marginLeft: sender === "friend" ? 1.5 : 0,
        }}
      >
        {username}
      </Typography>
      <StyledMessage
        sx={{
          backgroundColor: sender === "friend" ? "#daa520" : "blue",
          alignSelf: sender === "friend" ? "flex-start" : "flex-end",
          wordWrap: "break-word",
          wordBreak: "break-all",
          fontFamily: "'Roboto','Helvetica','Arial',sans-serif;",
        }}
      >
        {message}
      </StyledMessage>
      <Typography
        sx={{
          alignSelf: sender === "friend" ? "flex-start" : "flex-end",
          color: "grey",
          fontSize: 11,
          marginRight: sender === "you" ? 1.5 : 0,
          marginLeft: sender === "friend" ? 1.5 : 0,
        }}
      >
        {time}
      </Typography>
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
