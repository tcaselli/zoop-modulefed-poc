import React from 'react';
import Header from './components/Header';
import Counter from './components/Counter/Counter';
import AppCard from './components/AppCard';

export type AppProps = {
  className?: string;
  userName?: string;
};

const App: React.FC<AppProps> = ({ className, userName }) => {
  return (
    <AppCard className={className}>
      <Header userName={userName} />
      <Counter />
    </AppCard>
  );
};

export default App;
