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
  height: 700,
  overflowY: "auto",
  overflowX: "hidden",
  paddingLeft: "10px !important",
  paddingRight: "10px !important",
  "&::-webkit-scrollbar": {
    width: "12px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});
