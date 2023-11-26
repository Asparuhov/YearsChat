import React from "react";
import { Button, Grid, TextField, styled } from "@mui/material";

const ChatFooter: React.FC = () => {
  return (
    <StyledChatFooter item xs={12}>
      <TextField sx={{width: "80%"}}/>
      <Button variant="contained" sx={{width: 75, marginRight: 1, height: 55}}>Send</Button>
    </StyledChatFooter>
  );
};

export default ChatFooter;

const StyledChatFooter = styled(Grid)({
  maxWidth: 500,
  height: 85,
  border: "2px solid blue",
  borderTop: "none",
  display: "flex",
  justifyContent: "space-between"
});
