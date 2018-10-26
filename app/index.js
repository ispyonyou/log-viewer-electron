import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import {ipcRenderer} from 'electron';
import './app.global.css';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

ipcRenderer.on( 'new-log-file-was-loaded', (event, arg) => {
  store.dispatch({ type: 'CHANGE_FILE', payload: { filePath: arg } });

  ipcRenderer.send('get-log-messages', {startIndex: 0, size: 50});
} )

ipcRenderer.on( 'new-log-messages', (event, arg) => {
  store.dispatch({ type: 'SET_LOG_MESSAGES', payload: { logMessages: arg } });
} )
