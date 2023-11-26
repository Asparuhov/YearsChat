import { useState, useEffect } from "react";
import { Box, Button, TextField, styled } from "@mui/material";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:4000");
type InputEvent = React.ChangeEvent<HTMLInputElement>;

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const joinRoom = () => {
    if (username !== "" && roomId !== "") {
      socket.emit("join_room");
    }
  };

  return (
    <StyledBox>
      <TextField
        label="Username"
        color="primary"
        focused
        onChange={(event: InputEvent) => setUsername(event.target.value)}
      />
      <TextField
        label="Room ID"
        color="primary"
        focused
        onChange={(event: InputEvent) => setRoomId(event.target.value)}
      />
      <Button variant="contained">Join Room</Button>
    </StyledBox>
  );
};

export default LoginPage;

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "300px",
  border: "2px solid blue",
  borderRadius: "7px",
  margin: "0 auto",
  padding: "25px",
  "& > *": {
    margin: "15px",
  },
});
