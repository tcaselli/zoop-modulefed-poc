// ? CommonJS imports, we can use ES modules thanks to webpack.
// const express = require("express");
// const React = require("react");
// const renderToString = require("react-dom/server").renderToString;
// const Home = require("./client/components/Home").default;

// Regenerator Runtime error (async await syntax) polyfill
import 'babel-polyfill';

import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';

import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import Routes from './client/Routes';

const app = express();

// Proxy api routes.
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    // Avoid security problems with google oauth flow. Redirection URL for google.
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:1904';
      return opts;
    },
  }),
);

// Make client bundle accessible to the public.
app.use(express.static('public')); // Tell express that this folder is accessible to the outside.

// Receive all routes and handle them with renderer.
app.get('*', (req, res) => {
  // Create Redux store before rendering the html
  const store = createStore(req); // reference to server side redux store.
  // Data Loading logic
  // execute loadData functions for each components and returning an array of promises that we can wait to resolve.
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null; // Pass reference of Server side store to the component.
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
    const content = renderer(req, store, context);

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

app.listen(1904, () => {
  console.log('Listening on port 1904');
});
