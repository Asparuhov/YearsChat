import React, { ReactNode, useEffect, useRef } from "react";
import { Grid, styled } from "@mui/material";

interface IProps {
  children: ReactNode;
}

export const ChatBody: React.FC<IProps> = ({ children }) => {
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <StyledChatBody ref={chatBodyRef} item xs={12}>
      {children}
    </StyledChatBody>
  );
};

const StyledChatBody = styled(Grid)(({ theme }) => ({
  height: 470,
  border: "1px solid rgb(133, 133, 133)",
  overflowY: "auto",
  overflowX: "hidden",
  paddingLeft: "10px !important",
  paddingRight: "10px !important",
  marginTop: 10,
  zIndex: 2,
  "&::-webkit-scrollbar": {
    width: "5px",
    zIndex: 1,
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
  scrollbarWidth: "thin",
  scrollbarColor: "#888 #f1f1f1",
}));
