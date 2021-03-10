import React from 'react';
import Header from './components/Header';
import Counter from './components/Counter/Counter';
import AppCard from './components/AppCard';

export type AppProps = {
  className?: string;
};

const App: React.FC<AppProps> = ({ className }) => {
  return (
    <AppCard className={className}>
      <Header />
      <Counter />
    </AppCard>
  );
};

export default App;
