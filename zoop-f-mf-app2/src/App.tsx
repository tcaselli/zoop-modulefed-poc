import { Alert, Button, Card, Form, InputGroup } from 'react-bootstrap';

import React from 'react';

export type AppProps = {
  className?: string;
};

const App: React.FC<AppProps> = ({ className }) => {
  return (
    <Card className={className}>
      <Card.Header>MF App2</Card.Header>
      <Card.Body>
        <Form.Group>
          <Form.Label>Counter value</Form.Label>
          <Form.Control type="text" placeholder="" readOnly />
          <Form.Text className="text-muted">
            This value is initialized from server and then updated from events in the browser
          </Form.Text>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default App;
