import React, { Profiler, useEffect } from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import { useInput } from '@com.zooplus/f-shared';

interface Props {
  id?: string;
}

export default function Header({ id = 'header' }: Props) {
  const { value, status, init, subscribe } = useInput({ id });

  useEffect(() => {
    init();
  }, [init]);

  subscribe();

  return (
    <Profiler id="Header" onRender={console.log}>
      <Alert variant="info">
        Hello <span>{status === 'ready' && value ? value : <i>#NO NAME#</i>}</span>
      </Alert>
    </Profiler>
  );
}
