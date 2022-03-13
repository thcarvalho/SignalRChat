import { Message } from "../classes/message";
import { useEffect, useRef } from "react";

interface MessageContainerParams {
  messages: Message[];
}

function MessageContainer({ messages }: MessageContainerParams) {
  return (
    <div className="message-container">
      {messages.map((m, i) => (
        <div key={i} className="user-message">
          <div className="message bg-primary">{m.message}</div>
          <div className="from-user">{m.user}</div>
        </div>
      ))}
    </div>
  );
}

export default MessageContainer;
