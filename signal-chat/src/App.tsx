import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import Lobby from "./components/Lobby";
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Message } from "./classes/message";
import Chat from "./components/Chat";

function App() {
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  async function joinRoom(user: string, room: string) {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/chat", {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((m) => [...m, { user, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users)
      })

      connection.onclose(e => {
        setConnection(undefined);
        setMessages([]);
        setUsers([]);
      })

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (error) {
      console.error(error);
    }
  }

  async function sendMessage(message: string) {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (error) {
      console.error(error);
    }
  }

  async function closeConnection() {
    try {
      await connection?.stop();
    } catch (error) {
      console.error(error);
      
    }
  }


  return (
    <div className="app">
      <h2>SignalR Chat</h2>
      <hr className="line" />
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat messages={messages} sendMessage={sendMessage} closeConnection={closeConnection} users={users}/>
      )}
    </div>
  );
}

export default App;
