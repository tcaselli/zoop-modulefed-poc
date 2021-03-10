import React, { Profiler } from 'react';
// import Alert from 'react-bootstrap/Alert';

interface Props {
  userName: string | undefined;
}

export default function Header({ userName }: Props) {
  return (
    // <Profiler id="Header" onRender={console.log}>
    // <Alert variant="info">
    <p>
      Hello <span>{userName || <i>#NO NAME#</i>}</span>
    </p>
    // </Alert>
    // </Profiler>
  );
}
