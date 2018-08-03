import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import MainViewContainer from './containers/MainViewContainer';
import createStore from './redux/createStore';
import Loading from './components/Loading';
import './scss/app.scss';

const { store, persistor } = createStore();

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate  persistor={persistor} loading={<Loading />}>
          <MainViewContainer />
        </PersistGate>
      </Provider>
    );
  }
}
