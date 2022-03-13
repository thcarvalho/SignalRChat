import { FormEvent, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

interface SendMessageFormParams {
  sendMessage: (message: string) => void;
}

function SendMessageForm({ sendMessage }: SendMessageFormParams) {
  const [message, setMessage] = useState("");

  function submitForm(e: FormEvent) {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  }

  return (
    <Form onSubmit={submitForm}>
      <InputGroup>
        <FormControl
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button variant="primary" type="submit" disabled={!message}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SendMessageForm;
