import React from 'react';
import { Provider } from 'react-redux';
// import redux-devtools
import DevTools from './DevTools';
// import App
import App from './App';
import ReadyPage from './ReadyPageContainer';
import Login from './LoginContainer';

// import react router 
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { history } from '../store/configureStore';

const Root = ({ store }) => (
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/ready" component={ReadyPage} />
          <Route path="/login" component={Login} />
        </div>
      </ConnectedRouter>
  </Provider>
);

export default Root;