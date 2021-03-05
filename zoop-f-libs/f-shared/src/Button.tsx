import React, { ReactChild } from 'react';

export interface ButtonProps {
  children: ReactChild;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="btn btn-outline-primary" onClick={onClick}>
      {children}
    </button>
  );
};
