import React, { ReactChild } from 'react';

export interface ButtonProps {
  children: ReactChild;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};
