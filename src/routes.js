import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Main from './pages/Main';
import Signin from './pages/Signin';
import Annotation from './pages/Annotation';
import SyncAnnotation from './pages/SyncAnnotation';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn: createSwitchNavigator({
          Signin,
        }),
        App: createBottomTabNavigator(
          {
            Main,
            Annotation,
            SyncAnnotation,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#333',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#ccc',
              },
            },
          }
        ),
      },
      { initialRouteName: signedIn ? 'App' : 'SignIn' }
    )
  );
