import Counter from './Counter';

import React from 'react';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

export default function Exposed() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
