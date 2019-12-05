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
              activeTintColor: '#20ab53',
              inactiveTintColor: 'rgb(0,0,0)',
              labelStyle: {
                fontSize: 14,
              },
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }
        ),
      },
      { initialRouteName: signedIn ? 'App' : 'SignIn' }
    )
  );
