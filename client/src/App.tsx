import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";
import { useChatContext } from "./ChatContext";
const App = () => {
  const { userJoin, username, roomId } = useChatContext();

  return userJoin && username && roomId ? (
    <ChatPage username={username} roomId={roomId} />
  ) : (
    <LoginPage />
  );
};

export default App;
