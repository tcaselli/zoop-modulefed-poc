import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import reducers from '../client/store/reducers';

// Create store for the server side rendering
export default (req) => {
  // Axios configuration for render server, pass cookies from initial request (browser) to make the api request.
  const axiosInstanceRenderServer = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    // Pass the cookies with header.
    headers: {
      cookie: req.get('cookie') || '', // Empty string if no cookies.
    },
  });

  const store = createStore(
    reducers,
    {}, // Empty initial state
    // Thunk with extra argument to pass axios instance to action creators of redux.
    applyMiddleware(thunk.withExtraArgument(axiosInstanceRenderServer)),
  );

  return store;
};
