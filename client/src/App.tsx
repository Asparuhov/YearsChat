import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";
import { useChatContext } from "./contexts/chat/ChatContext";
import { useThemeContext } from "./contexts/theme/ThemeContextProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";

const App = () => {
  const { userJoin, username, roomId } = useChatContext();
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {userJoin && username && roomId ? (
        <ChatPage username={username} roomId={roomId} />
      ) : (
        <LoginPage />
      )}
    </ThemeProvider>
  );
};

export default App;
