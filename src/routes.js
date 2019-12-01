import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Signin from './pages/Signin';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn: createSwitchNavigator({
          Signin,
        }),
        App: createBottomTabNavigator(
          {
            Initial: {
              screen: createStackNavigator(
                {
                  Main,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerLeftContainerStyle: {
                      marginLeft: 3,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Menu',
                tabBarVisible: true,
              },
            },
            Main,
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
