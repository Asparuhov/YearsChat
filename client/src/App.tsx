import React, { useEffect, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";
import { useMessageContext } from "./MessagesContext";
const App: React.FC = () => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const username = localStorage.getItem("username");
  const roomId = localStorage.getItem("roomId");
  const { socket } = useMessageContext();
  
  useEffect(() => {
    if (!!username && !!roomId) {
      setShowChat(true);
      socket.emit("join_room", roomId);
    }
  }, []);

  return showChat && username && roomId ? (
    <ChatPage username={username} roomId={roomId} />
  ) : (
    <LoginPage setShowChat={setShowChat} />
  );
};

export default App;
