import './i18n/config';

import AppCard from './components/AppCard';
import Counter from './components/Counter';
import { Provider } from 'react-redux';
import React from 'react';
import WelcomeMessage from './components/WelcomeMessage';
import { store } from './store/store';

export type AppProps = {
  className?: string;
};

const App: React.FC<AppProps> = ({ className }) => {
  return (
    <Provider store={store}>
      <AppCard className={className}>
        <WelcomeMessage />
        <Counter />
      </AppCard>
    </Provider>
  );
};

export default App;
