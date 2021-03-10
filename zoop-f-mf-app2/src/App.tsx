import { Card, Form } from 'react-bootstrap';

import React, { Profiler, useLayoutEffect } from 'react';
import { Button, Header } from '@com.zooplus/f-shared';
import { useCounter } from './hooks/useCounterState';

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
            <Header>I am a styled shared</Header>
            <Button onClick={() => console.log('click')}>I am styled shared button</Button>
            <br />
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
