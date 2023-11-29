import React, { useState } from "react";
import { Button, Grid, TextField, styled } from "@mui/material";

interface IChatFooterProps {
  sendMessage: (message: string) => void;
}

const ChatFooter: React.FC<IChatFooterProps> = ({ sendMessage }) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      sendMessage(currentMessage);
      setCurrentMessage("");
    }
  };

  return (
    <StyledChatFooter item xs={12}>
      <TextField
        sx={{ width: "80%" }}
        value={currentMessage}
        onChange={(event) => setCurrentMessage(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="contained"
        sx={{ width: 75, marginRight: 1, height: 55 }}
        onClick={() => {
          sendMessage(currentMessage);
          setCurrentMessage("");
        }}
      >
        Send
      </Button>
    </StyledChatFooter>
  );
};

export default ChatFooter;

const StyledChatFooter = styled(Grid)({
  maxWidth: 500,
  height: 85,
  borderTop: "1px solid rgb(133, 133, 133)",
  display: "flex",
  justifyContent: "space-between",
});
