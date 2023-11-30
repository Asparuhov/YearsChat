import { useState } from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useChatContext } from "../../contexts/chat/ChatContext";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { socket, setUserJoin } = useChatContext();

  const joinRoom = () => {
    if (username !== "" && username.length > 10 && roomId !== "")
      setError("Username max 10 symbols");
    else if (username !== "" && roomId !== "" && roomId.length > 5)
      setError("Room ID less than 5 symbols");
    else {
      localStorage.setItem("username", username);
      localStorage.setItem("roomId", roomId);
      socket.emit("join_room", roomId);
      setUserJoin(true);
    }
  };

  return (
    <StyledBox>
      <TextField
        label="Username"
        color="primary"
        focused
        value={username}
        onChange={(event: InputEvent) => {
          setError("");
          setUsername(event.target.value);
        }}
      />
      <TextField
        label="Room ID"
        color="primary"
        focused
        value={roomId}
        onChange={(event: InputEvent) => {
          setError("");
          setRoomId(event.target.value);
        }}
      />
      {error !== "" && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Button variant="contained" sx={{ marginBottom: 2 }} onClick={joinRoom}>
        Join Room
      </Button>
    </StyledBox>
  );
};

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "300px",
  border: "2px solid blue",
  borderRadius: "7px",
  margin: "0 auto",
  marginTop: 10,
  ".MuiTextField-root": {
    margin: "15px 0",
  },
  "& > :last-child": {
    marginTop: "15px",
  },
});
