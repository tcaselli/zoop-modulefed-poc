import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import React, { Profiler } from 'react';
import imported from 'react-imported-component';
import Input from './../components/Input';
import logo from './../assets/zooplus.jpg';
const App1Card = imported(() => import('app1/Card'));
const App1Header = imported(() => import('app1/Header'));
const App1Counter = imported(() => import('app1/Counter'));
const App2 = imported(() => import('app2/App'));

const HomePage = () => {
  return (
    <Profiler id="mf-layout" onRender={console.log}>
      <Container>
        <Row className="flex justify-content-center align-content-center">
          <img height="80px" src={logo} />
        </Row>
        <Row>
          <Col xs="12" lg={{ span: 8, offset: 2 }}>
            <Card className="mt-3">
              <Card.Header>MF Layout</Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Your Name</Form.Label>
                  <Input />
                  <Form.Text className="text-muted">This name will be propagated to App1 via props</Form.Text>
                </Form.Group>
                <App1Card>
                  <App1Header id="name" />
                </App1Card>
                <App1Counter />
                <App2 />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Profiler>
  );
};

export default {
  component: HomePage,
};
