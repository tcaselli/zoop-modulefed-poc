import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { ErrorHandler, useInput } from '@com.zooplus/f-shared';

import React from 'react';

const App1Wrapper = () => {
  const App1Counter = React.lazy(() => import('app1/Counter'));
  const App1Card = React.lazy(() => import('app1/Card'));
  const App1WelcomeMessage = React.lazy(() => import('app1/WelcomeMessage'));

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <App1Card>
        <App1WelcomeMessage id="name" />
        <App1Counter />
      </App1Card>
    </React.Suspense>
  );
};

const App2Wrapper = () => {
  const App2 = React.lazy(() => import('app2/App2'));
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <App2 className="mt-3" />
    </React.Suspense>
  );
};

const App = () => {
  const { value, onChange } = useInput({ id: 'name' });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e?.target?.value;
    onChange(inputValue);
  };

  return (
    <Container>
      <Row>
        <Col xs="12" lg={{ span: 8, offset: 2 }}>
          <Card className="mt-3">
            <Card.Header>MF Layout</Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="Please enter your name..."
                  value={value}
                  onChange={handleOnChange}
                />
                <Form.Text className="text-muted">This name will be propagated to App1 via props</Form.Text>
              </Form.Group>
              <ErrorHandler>
                <App1Wrapper />
              </ErrorHandler>
              <ErrorHandler>
                <App2Wrapper />
              </ErrorHandler>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
