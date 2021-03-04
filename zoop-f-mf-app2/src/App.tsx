import { Card, Form } from 'react-bootstrap';

import React, { Profiler, useLayoutEffect } from 'react';
import { useCounter } from './hooks/useCounter';

export type AppProps = {
  className?: string;
};

const App: React.FC<AppProps> = () => {
  const { count, fetch, subscribe } = useCounter();

  useLayoutEffect(() => {
    fetch();
  }, [fetch]);

  subscribe();

  return (
    <Profiler id="App2" onRender={console.log}>
      <Card>
        <Card.Header>MF App2</Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Counter value: {count} </Form.Label>
            <Form.Control type="text" placeholder="" readOnly value={count} />
            <Form.Text className="text-muted">
              This value is initialized from server and then updated from events in the browser
            </Form.Text>
          </Form.Group>
        </Card.Body>
      </Card>
    </Profiler>
  );
};

export default App;
