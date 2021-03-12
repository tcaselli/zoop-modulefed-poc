import './styles/boostrap.scss';

import React, { useEffect } from 'react';

import App from './App';
import ReactDOM from 'react-dom';
import { initAxios } from './services/axios';

const Standalone = () => {
  useEffect(() => {
    initAxios();
  }, []);
  return <App />;
};

export default Standalone;

ReactDOM.render(<Standalone />, document.getElementById('mf-app1'));
