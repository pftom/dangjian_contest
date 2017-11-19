import React from 'react';
import { Provider } from 'react-redux';
// import App
import App from './App';
import ReadyPage from './ReadyPageContainer';

// import react router 
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const Root = ({ store }) => (
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App} />
          <Route exact path="/ready" component={ReadyPage} />
        </div>
      </ConnectedRouter>
  </Provider>
);

export default Root;