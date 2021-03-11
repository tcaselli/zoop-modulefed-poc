import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import React, { Profiler, ReactChild, SyntheticEvent } from 'react';
import { useInput } from '@com.zooplus/f-shared';
import ErrorHandler from './components/ErrorHandler';

const App1Card = (await import('app1/Card')).default;
const App1Header = (await import('app1/Header')).default;

interface LayoutProps {
  children: ReactChild;
}

const Layout = ({ children }: LayoutProps) => {
  const { value, onChange } = useInput({ id: 'name' });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e?.target?.value;
    onChange(inputValue);
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
                  <Form.Control
                    id="name"
                    type="text"
                    placeholder="Please enter your name..."
                    value={value}
                    onChange={handleOnChange}
                  />
                  <Form.Text className="text-muted">This name will be propagated to App1 via props</Form.Text>
                </Form.Group>
                <App1Card>
                  <App1Header id="name" />
                </App1Card>
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
        <ErrorHandler>
          <App1Counter />
          <App2 />
        </ErrorHandler>
      </Layout>
    </Profiler>
  );
};

export default App;
