import React, { createContext, useContext, ReactNode, useState } from "react";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

export interface IMessageData {
  id: string;
  roomId: string;
  username: string;
  message: string;
  time: string;
}

interface IMessageContext {
  messageList: Array<IMessageData>;
  setMessageList: React.Dispatch<React.SetStateAction<IMessageData[]>>;
  socket: io.Socket;
}

const MessageContext = createContext<IMessageContext | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messageList, setMessageList] = useState<Array<IMessageData>>([]);

  return (
    <MessageContext.Provider value={{ messageList, setMessageList, socket }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = (): IMessageContext => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
