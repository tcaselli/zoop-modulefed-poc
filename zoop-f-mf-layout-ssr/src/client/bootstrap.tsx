import './styles/boostrap.scss';

// Regenerator Runtime error (async await syntax) polyfill
import 'babel-polyfill';
import '../imported';
// Startup point for the client side application.
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from './Routes';
import { rehydrateMarks, ImportedController } from 'react-imported-component';

rehydrateMarks().then(() => {
  ReactDOM.hydrate(
    <ImportedController>
      <BrowserRouter>
        <div> {renderRoutes(Routes)} </div>
      </BrowserRouter>
    </ImportedController>,
    document.getElementById('mf-layout'),
  );
});
