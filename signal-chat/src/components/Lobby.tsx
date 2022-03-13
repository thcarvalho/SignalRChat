import React, { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface LobbyParams {
  joinRoom: (user: string, room: string) => void
}

function Lobby({ joinRoom }: LobbyParams) {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  function submitForm(e: FormEvent): void {
    e.preventDefault();
    joinRoom(user, room);
  }

  return (
    <Form className="lobby" onSubmit={submitForm}>
      <Form.Group>
        <Form.Control
          placeholder="name"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
        <Form.Control
          placeholder="room"
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        />
      </Form.Group>
      <Button variant="success" type="submit" disabled={!user || !room}>
        Join
      </Button>
    </Form>
  );
};

export default Lobby;
