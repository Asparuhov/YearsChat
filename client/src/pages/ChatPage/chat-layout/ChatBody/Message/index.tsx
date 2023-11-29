import { Box, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { EditPopper } from "../EditPopper";

interface IMessageProps {
  id: string;
  message: string;
  sender: "you" | "friend";
  username: string;
  time: string;
}

export const Message: React.FC<IMessageProps> = ({
  id,
  message,
  sender,
  username,
  time,
}) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleEditIconClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setPopoverOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

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
          backgroundColor: sender === "friend" ? "#daa520" : "#1565c0",
          alignSelf: sender === "friend" ? "flex-start" : "flex-end",
          wordWrap: "break-word",
          wordBreak: "break-all",
          fontFamily: "'Roboto','Helvetica','Arial',sans-serif;",
        }}
      >
        {message}
      </StyledMessage>
      <StyledEditAndTime
        sx={{
          alignSelf: sender === "friend" ? "flex-start" : "flex-end",
          marginRight: sender === "you" ? 1.5 : 0,
          marginLeft: sender === "friend" ? 1.5 : 0,
        }}
      >
        {sender === "you" && (
          <div onClick={handleEditIconClick}>
            <StyledEditIcon />
          </div>
        )}
        {time}
      </StyledEditAndTime>
      <EditPopper
        open={isPopoverOpen}
        handlePopoverClose={handlePopoverClose}
        anchorEl={anchorEl}
        messageId={id}
        message={message}
      />
    </StyledMessageContainer>
  );
};

const StyledMessageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  margin: "5px",
});

const StyledMessage = styled(Box)(({ theme }) => ({
  borderRadius: 15,
  fontSize: 18,
  display: "inline-block",
  padding: theme.spacing(1, 2),
  margin: "5px",
  color: "white",
}));

const StyledEditIcon = styled(EditIcon)({
  color: "grey",
  width: 18,
  "&:hover": {
    cursor: "pointer",
  },
});

const StyledEditAndTime = styled(Typography)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "grey",
  fontSize: 11,
});
