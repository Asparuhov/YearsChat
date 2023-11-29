import { useState } from "react";
import { Box, Button, TextField, styled } from "@mui/material";
import { useMessageContext } from "../../MessagesContext";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface ILoginPageProps {
  setShowChat: (value: boolean) => void;
}

export const LoginPage: React.FC<ILoginPageProps> = ({ setShowChat }) => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const { socket } = useMessageContext();

  const joinRoom = () => {
    if (username !== "" && roomId !== "") {
      localStorage.setItem("username", username);
      localStorage.setItem("roomId", roomId);
      socket.emit("join_room", roomId);
      setShowChat(true);
    }
  };

  return (
    <StyledBox>
      <TextField
        label="Username"
        color="primary"
        focused
        value={username}
        onChange={(event: InputEvent) => setUsername(event.target.value)}
      />
      <TextField
        label="Room ID"
        color="primary"
        focused
        value={roomId}
        onChange={(event: InputEvent) => setRoomId(event.target.value)}
      />
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
  ".MuiTextField-root": {
    margin: "15px 0",
  },
  "& > :last-child": {
    marginTop: "15px",
  },
});
