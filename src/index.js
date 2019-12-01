/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';

import './config/ReactotronConfig';
import createRouter from './routes';

export default function App() {
  const Routes = createRouter(false);

  return <Routes />;
}
