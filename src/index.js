import React from 'react';
import ReactDOM from 'react-dom';
// import toppest component Root
import Root from './containers/Root.js';
// import source of true state store
import configureStore from './store/configureStore.js';
import registerServiceWorker from './registerServiceWorker';

const { store, persistor } = configureStore();
export {
  persistor,
}

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
