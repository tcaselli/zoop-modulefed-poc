import React, { ReactChild } from 'react';

export interface HeaderProps {
  children: ReactChild;
}

export const Header = ({ children }: HeaderProps) => {
  return <h1 className="text-ternary font-weight-light">{children}</h1>;
};
