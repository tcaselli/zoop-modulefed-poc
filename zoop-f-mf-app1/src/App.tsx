import { Alert, Button, Card, Form, InputGroup } from 'react-bootstrap';

import React from 'react';

export type AppProps = {
  className?: string;
  userName?: string;
};

const App: React.FC<AppProps> = ({ className, userName }) => {
  return (
    <Card className={className}>
      <Card.Header>MF App1</Card.Header>
      <Card.Body>
        <Alert variant="info">
          Hello <span>{userName || <i>#NO NAME#</i>}</span>
        </Alert>
        <div>
          <Form.Group>
            <Form.Label>Counter value</Form.Label>
            <InputGroup>
              <Form.Control type="text" placeholder="" readOnly />
              <InputGroup.Append>
                <Button variant="primary">Increment</Button>
              </InputGroup.Append>
            </InputGroup>
            <Form.Text className="text-muted">
              This value is initialized from server.
              <br />
              By clicking on increment button it will:
              <ol>
                <li>Send an increment request to the server</li>
                <li>Once request response received, value will be updated with response value</li>
                <li>An event is thrown so that other microfrontends can be refreshed with new value</li>
              </ol>
            </Form.Text>
          </Form.Group>
        </div>
      </Card.Body>
    </Card>
  );
};

export default App;
