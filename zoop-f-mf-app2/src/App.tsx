import { Button, Header } from '@com.zooplus/f-shared';
import { Card, Form } from 'react-bootstrap';
import React, { Profiler, useLayoutEffect } from 'react';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { useCounter } from './hooks/useCounterStore';

export type AppProps = {
  className?: string;
};

const App: React.FC<AppProps> = ({ className }: AppProps) => {
  return (
    <Provider store={store}>
      <Card className={className}>
        <Card.Header>MF App2</Card.Header>
        <Card.Body>
          <CountForm />
        </Card.Body>
      </Card>
    </Provider>
  );
};

const CountForm = () => {
  const { count, fetch, subscribe } = useCounter();

  useLayoutEffect(() => {
    fetch();
  }, [fetch]);

  subscribe();
  return (
    <div>
      <div className="mb-3 p-3 border">
        <Header>I am a styled shared Header ! :)</Header>
        <Button onClick={() => console.log('click')}>I am styled shared button</Button>
      </div>
      <Form.Group>
        <Form.Label>Counter value:</Form.Label>
        <Form.Control type="text" placeholder="" readOnly value={count} />
        <Form.Text className="text-muted">
          This value is initialized from server and then updated from events in the browser
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default App;
