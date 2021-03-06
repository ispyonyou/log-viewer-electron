// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import chosenFile from './chosenFile'
import logMessages from './logMessages'
import settings from './settings'
import filter from './filter'

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({ router: routerReducer, counter, chosenFile, logMessages, settings, filter })
  );
}
