import React from 'react';
import Header from './components/Header';
import Counter from './components/Counter/Counter';
import AppCard from './components/AppCard';
import { Provider } from 'react-redux';
import { store } from './store/store';

export type AppProps = {
  className?: string;
};

const App: React.FC<AppProps> = ({ className }) => {
  return (
    <Provider store={store}>
      <AppCard className={className}>
        <Header />
        <Counter />
      </AppCard>
    </Provider>
  );
};

export default App;
