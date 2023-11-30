import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatProvider } from "./contexts/chat/ChatContext";
import { ThemeContextProvider } from "./contexts/theme/ThemeContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ChatProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </ChatProvider>
);
