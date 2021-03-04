import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import React, { Profiler, useCallback, useState } from 'react';

import ErrorHandler from './components/ErrorHandler';

const Layout = ({ children }) => {
  const App1Card = React.lazy(() => import('app1/Card'));
  const App1Header = React.lazy(() => import('app1/Header'));

  const [name, setName] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  return (
    <Profiler id="mf-layout" onRender={console.log}>
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
                <ErrorHandler fallback={<p style={{ backgroundColor: 'blue' }}>load</p>}>
                  <App1Card>
                    <App1Header userName={name} />
                  </App1Card>
                </ErrorHandler>
                {children}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Profiler>
  );
};

const App = () => {
  const App1Counter = React.lazy(() => import('app1/Counter'));
  const App2 = React.lazy(() => import('app2/App2'));

  return (
    <Profiler id="mf-app" onRender={console.log}>
      <Layout>
        <ErrorHandler fallback={<p style={{ backgroundColor: 'red' }}>load</p>}>
          <App1Counter />
          <App2 />
        </ErrorHandler>
      </Layout>
    </Profiler>
  );
};

export default App;
