import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

import { printDrainHydrateMarks } from 'react-imported-component';

// Renderer generate HTML from React and load redux state and append script tag with client bundle.
export default function renderer(req, store, context) {
  const App = () => {
    return (
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </Provider>
    );
  };

  const content = renderToString(<App />);
  // We pass the url via req.path

  const helmet = Helmet.renderStatic(); // Returns an object with all the setup tags with Helmet in JSX.

  // Add script tag to pass server store state to client.
  // Add script tag to the HTML in order to download client bundle.js
  return `
    <html>
      <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <link rel="stylesheet" href="assets/css/src_client_bootstrap_tsx-src_imported_ts.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.INITIAL_STATE = ${store.getState()}</script>
        <script defer="defer" src="main.bundle.js"></script> 
        <script defer="defer" src="vendors.bundle.js"></script> 
        ${printDrainHydrateMarks()}
      </body>
    </html>
  `;
}
