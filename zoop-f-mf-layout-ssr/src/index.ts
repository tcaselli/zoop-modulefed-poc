// Regenerator Runtime error (async await syntax) polyfill
import 'babel-polyfill';

import express from 'express';
import { matchRoutes } from 'react-router-config';

import renderer from './helpers/renderer';
import Routes from './client/Routes';

const app = express();

// Make client bundle accessible to the public.
app.use(express.static('public')); // Tell express that this folder is accessible to the outside.

// Receive all routes and handle them with renderer.
app.get('*', (req, res) => {
  // Create Redux store before rendering the html
  // Data Loading logic
  // execute loadData functions for each components and returning an array of promises that we can wait to resolve.
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData() : null; // Pass reference of Server side store to the component.
    })
    // eslint-disable-next-line array-callback-return
    .map((promise) => {
      // It avoids Promise.all to catch if a fetching fails.
      // We wrap all promises on a promise that resolve anyway.
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    // Context of the route, is used to get informations from static router.
    const context = {};

    // Server side store is now built correctly.
    // Renderer generate HTML from React and append script tag with client bundle.
    const content = renderer(req, context);

    // If the context contains a url that means that a <Redirect> tag has been rendered, we redirect the user to this url. This is the case for requireAuth when logout.
    if (context.url) {
      return res.redirect(301, context.url);
    }

    // If the notFoundPage is rendered context.notFound is assigned to true.
    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
