import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// import redux persistor
import { persistor } from '../index';

// import redux-devtools
import DevTools from './DevTools';
// import App
import App from './App';
import ReadyPage from './ReadyPageContainer';
import Login from './LoginContainer';
import MasterPage from './MasterPageContainer';
import Game from './GameContainer';

import {
  NotFound,
} from '../components/'

// import react router 
import { Route, Redirect } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import { history } from '../store/configureStore';

import '../components/css/Root.css';

// Route: /
// judge whether user have permission

// Route: /ready
// user logged in and ready for contest

// Route: /login
// user login in page

// Route: /contest
// master contest page
// master list page

// Route: /dash_board
// master init page

// Route: /404
// 404 not found

const Root = ({ store }) => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <div style={{ height: '100%' }}>
            <Route exact path="/" component={App} />
            <Route path="/ready" component={ReadyPage} />
            <Route path="/login" component={Login} />
            <Route path="/404" component={NotFound} />
            <Route path="/dashboard" component={MasterPage} />
            <Route path="/contest" component={Game} />
          </div>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );

}

export default Root;