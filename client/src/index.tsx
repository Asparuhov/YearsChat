import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatProvider } from "./ChatContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChatProvider>
    <App />
  </ChatProvider>
);
