import React from "react";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const ChatPage = () => {
  return (
    <div>
      <input type='text' placeholder="Username" />
      <button>Send</button>
    </div>
  );
};

export default ChatPage;
