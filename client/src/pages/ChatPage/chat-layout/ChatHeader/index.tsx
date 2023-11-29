import React from "react";
import { Grid, Typography, styled } from "@mui/material";
import { useChatContext } from "../../../../ChatContext";
interface IProps {
  roomId: string;
}

export const ChatHeader: React.FC<IProps> = ({ roomId }) => {
  const { setUserJoin, setMessageList } = useChatContext();

  const logoutUser = () => {
    localStorage.clear();
    setMessageList([])
    setUserJoin(false);
  };

  return (
    <StyledChatHeader item xs={12}>
      <Typography
        variant="h5"
        color="white"
        textAlign="center"
      >{`Room: ${roomId}`}</Typography>
      <StyledLogout onClick={logoutUser}>
        <Typography variant="h5" color="white" textAlign="center">
          Leave
        </Typography>
      </StyledLogout>
    </StyledChatHeader>
  );
};

const StyledChatHeader = styled(Grid)({
  maxWidth: 500,
  height: 65,
  backgroundColor: "#1565c0",
  borderRadius: 8,
  display: "flex",
  justifyContent: "space-between",
  padding: 10,
});

const StyledLogout = styled("div")({
  "&:hover": {
    cursor: "pointer",
  },
});
