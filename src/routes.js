import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Signin from './pages/Signin';
import Annotation from './pages/Annotation';

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
