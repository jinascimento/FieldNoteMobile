import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';

import './config/ReactotronConfig';
import { store, persistor } from './store';
import createRouter from './routes';

export default function App() {
  const Routes = createRouter(false);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
