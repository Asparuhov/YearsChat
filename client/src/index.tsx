import ReactDOM from "react-dom/client";
import App from "./App";
import { MessageProvider } from "./MessagesContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <MessageProvider>
    <App />
  </MessageProvider>
);
