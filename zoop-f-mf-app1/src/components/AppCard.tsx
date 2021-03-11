import { Card } from 'react-bootstrap';
import React from 'react';

export type CardProps = {
  className?: string;
};

const AppCard: React.FC<CardProps> = ({ className, children }) => {
  return (
    <Card className={className}>
      <Card.Header>MF App1</Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default AppCard;
