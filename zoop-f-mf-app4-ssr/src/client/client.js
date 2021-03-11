// Regenerator Runtime error (async await syntax) polyfill
import "babel-polyfill";

// Startup point for the client side application.
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import axios from "axios";
import reducers from "./store/reducers";
import Routes from "./Routes";

const axiosInstanceClient = axios.create({
  baseURL: "/api", // /users => /api/users
});

// Redux devtool in the browser
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// Initiate state with render server store state. (INITIAL_STATE)
const store = createStore(
  reducers,
  // From render server
  window.INITIAL_STATE,
  // Thunk with extra argument to pass axios instance to action creators of redux.
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstanceClient)))
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
