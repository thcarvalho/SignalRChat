import { Button } from "react-bootstrap";
import { Message } from "../classes/message";
import ConnectedUsers from "./ConnectedUsers";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

interface ChatParams {
  sendMessage: (message: string) => void;
  closeConnection: () => void;
  messages: Message[];
  users: string[];
}
function Chat({ messages, sendMessage, closeConnection, users }: ChatParams) {
  return (
    <div>
      <div className="leave-room">
        <Button variant="danger" onClick={closeConnection}>
          Leave Room
        </Button>
      </div>
      <ConnectedUsers users={users}/>
      <div className="chat">
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
