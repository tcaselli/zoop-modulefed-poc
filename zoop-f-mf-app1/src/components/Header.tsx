import React, { Profiler } from 'react';
import Alert from 'react-bootstrap/esm/Alert';

interface Props {
  userName: string | undefined;
}

export default function Header({ userName }: Props) {
  return (
    <Profiler id="Header" onRender={console.log}>
      <Alert variant="info">
        Hello <span>{userName || <i>#NO NAME#</i>}</span>
      </Alert>
    </Profiler>
  );
}
