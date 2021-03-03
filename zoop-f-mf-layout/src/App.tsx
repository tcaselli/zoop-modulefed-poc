import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';

import ErrorHandler from './components/ErrorHandler';

const App = () => {
  const App1 = React.lazy(() => import('app1/App1'));
  const App2 = React.lazy(() => import('app2/App2'));

  const [name, setName] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  return (
    <ErrorHandler>
      <Container>
        <Row>
          <Col xs="12" lg={{ span: 8, offset: 2 }}>
            <Card className="mt-3">
              <Card.Header>MF Layout</Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Please enter your name..." value={name} onChange={onChange} />
                  <Form.Text className="text-muted">This name will be propagated to App1 via props</Form.Text>
                </Form.Group>
                <App1 className="mt-3" userName={name} />
                <App2 className="mt-3" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ErrorHandler>
  );
};

export default App;
