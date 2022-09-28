import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import store from './app/store';
Sentry.init({
  dsn: "https://6d71a7447dd3494586e0693ec77a2213@o1430120.ingest.sentry.io/6781101",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// const _history = createBrowserHistory()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        {/* <ConnectedRouter history={history}> */}
        <App />
        {/* </ConnectedRouter> */}
      </Router>
    </Provider>
  </React.StrictMode>
);
// https://www.cypress.io/blog/2018/11/14/testing-redux-store/
/* istanbul ignore else */
if (window.Cypress) {
  window.store = store;
}
