import React from "react";
import { Grid, styled } from "@mui/material";

interface IProps {
  children: any;
}

const ChatBody: React.FC<IProps> = ({ children }) => {
  return (
    <StyledChatBody item xs={12}>
      {children}
    </StyledChatBody>
  );
};

export default ChatBody;

const StyledChatBody = styled(Grid)({
  maxWidth: 500,
  height: 700,
  border: "2px solid blue",
});
