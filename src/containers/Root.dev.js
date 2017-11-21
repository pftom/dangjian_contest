import React from 'react';
import { Provider } from 'react-redux';
// import redux-devtools
import DevTools from './DevTools';
// import App
import App from './App';
import ReadyPage from './ReadyPageContainer';
import Login from './LoginContainer';
import MasterPage from './MasterPageContainer';
import { NotFound } from '../components/';

// import react router 
import { Route, Redirect } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { history } from '../store/configureStore';
import { LOGOUT } from '../constants/index';

const Root = ({ store }) => {
  const { token } = store.getState().user;
  console.log('token', token);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <button onClick={() => { store.dispatch({ type: LOGOUT })}}>Logout</button>
          <Route exact path="/" component={App} />
          <Route path="/ready" component={ReadyPage} />
          <Route path="/login" component={Login} />
          <Route path="/404" component={NotFound} />
          <Route path="/master" component={MasterPage} />
        </div>
      </ConnectedRouter>
    </Provider>
  )

}

export default Root;