import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript'; // Avoid XSS attacks
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

// Renderer generate HTML from React and load redux state and append script tag with client bundle.
export default function renderer(req, store, context) {
  const content = renderToString(
    // We pass the url via req.path
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>,
  );

  const helmet = Helmet.renderStatic(); // Returns an object with all the setup tags with Helmet in JSX.

  // Add script tag to pass server store state to client.
  // Add script tag to the HTML in order to download client bundle.js
  return `
    <html>
      <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
        <script src="main.bundle.js"></script> 
        <script src="vendors.bundle.js"></script> 
        <script src="http://localhost:1901/remoteEntry.js"></script> 
      </body>
    </html>
  `;
}
