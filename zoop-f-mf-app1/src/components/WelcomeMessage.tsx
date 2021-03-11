import React, { useEffect } from 'react';

import Alert from 'react-bootstrap/esm/Alert';
import { useInput } from '@com.zooplus/f-shared';

interface Props {
  id?: string;
}

export default function WelcomeMessage({ id = 'header' }: Props) {
  const { value, status, init, subscribe } = useInput({ id });

  useEffect(() => {
    init();
  }, [init]);

  subscribe();

  return (
    <Alert variant="info">
      Hello <span>{status === 'ready' && value ? value : <i>#NO NAME#</i>}</span>
    </Alert>
  );
}
