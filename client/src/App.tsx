import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const App: React.FC = () => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const username = localStorage.getItem("username");
  const roomId = localStorage.getItem("roomId");

  useEffect(() => {
    if (!!username && roomId) {
      setShowChat(true);
    }
  }, [roomId, username]);

  return showChat && username && roomId ? (
    <ChatPage username={username} roomId={roomId} socket={socket} />
  ) : (
    <LoginPage socket={socket} setShowChat={setShowChat} />
  );
};

export default App;
