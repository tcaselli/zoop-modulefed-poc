import React, { ReactChild } from 'react';

export interface ButtonProps {
  children: ReactChild;
  handleClick: () => void;
}

export const Button = ({ children, handleClick }: ButtonProps) => {
  return <button onClick={handleClick}>{children}</button>;
};
