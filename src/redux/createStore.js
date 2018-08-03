import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { createTracker } from 'redux-segment';
import promiseMiddleware from './middleware/simple-promise';

import { LOGOUT } from './modules/session/types';

import * as reducers from './modules';

const config = {
  key: 'rbgf',
  storage,
};

const tracker = createTracker();

export default function (initialState = {}) {
  const appReducer = persistCombineReducers(config, reducers);

  const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      state = undefined
    }
    return appReducer(state, action);
  };

  const middlewares = applyMiddleware(thunk, promiseMiddleware(), tracker);
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // const store = createStore(rootReducer, initialState, composeEnhancers(
  //   middlewares
  // ));

  const store = createStore(rootReducer, initialState, middlewares);

  const persistor = persistStore(store);

  return { store, persistor };
}
