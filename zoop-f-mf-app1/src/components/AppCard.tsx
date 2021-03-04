import { Card } from 'react-bootstrap';

import React, { Profiler } from 'react';

export type CardProps = {
  className?: string;
};

const AppCard: React.FC<CardProps> = ({ className, children }) => {
  return (
    <Profiler id="App1Layout" onRender={console.log}>
      <Card className={className}>
        <Card.Header>MF App1</Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Profiler>
  );
};

export default AppCard;
