import '../i18n/config.ts';

import Counter from './Counter';
import { Provider } from 'react-redux';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../store/counterSlice';

export default function ExposedCounter() {
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
