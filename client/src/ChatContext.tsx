import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

export interface IMessageData {
  id: string;
  roomId: string;
  username: string;
  message: string;
  time: string;
}

type ViewTypes = "edit" | "delete" | "default";

interface IChatContext {
  messageList: Array<IMessageData>;
  setMessageList: React.Dispatch<React.SetStateAction<IMessageData[]>>;
  socket: io.Socket;
  userJoin: boolean;
  setUserJoin: (isJoined: boolean) => void;
  username: string | null;
  roomId: string | null;
  view: ViewTypes;
  setView: React.Dispatch<React.SetStateAction<ViewTypes>>;
}

const ChatContext = createContext<IChatContext | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messageList, setMessageList] = useState<Array<IMessageData>>([]);
  const [userJoin, setUserJoin] = useState<boolean>(false);
  const [view, setView] = useState<ViewTypes>("default");
  const username = localStorage.getItem("username");
  const roomId = localStorage.getItem("roomId");

  useEffect(() => {
    if (!!username && !!roomId) {
      setUserJoin(true);
      socket.emit("join_room", roomId);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messageList,
        setMessageList,
        socket,
        userJoin,
        username,
        roomId,
        setUserJoin,
        view,
        setView,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): IChatContext => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
