import Counter from './Counter';

import React from 'react';
import counterReducer from './../../store/counterSlice';
// Add redux provider to exported component
import { Provider } from 'react-redux';

// Add translations to exported component
import '../../i18n/config.ts';
import { configureStore } from '@reduxjs/toolkit';

export default function Exposed() {
  const store = configureStore({
    reducer: { counter: counterReducer },
    devTools: { name: 'Counter store' },
  });
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
