import React, { ReactChild } from 'react';

export interface HeaderProps {
  children: ReactChild;
}

export const Header = ({ children }: HeaderProps) => {
  return <h1>{children}</h1>;
};
