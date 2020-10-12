import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import MainTabNavigator from './Tabs';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Add from '../pages/Add';
import Room from '../pages/Room';

export default function () {
  return createAppContainer(createStackNavigator({
        Home: {
          screen: MainTabNavigator,
          navigationOptions: ({navigation}) => {
            const {state} = navigation;
            if (state.index === 0) {
              return {
                headerShown: false,
              };
            } else if (state.index === 1) {
              return {
                headerTitle: '好友列表',
                headerTitleAlign: 'center',
              };
            } else {
              return {
                headerTitle: '个人中心',
                headerTitleAlign: 'center',
              };
            }
          },
        },
        Login: {
          screen: Login,
          navigationOptions: {
            headerShown: false,
          },
        },
        Register: {
          screen: Register,
          navigationOptions: {
            headerTitle: '注册',
          },
        },
        Add: {
          screen: Add,
          navigationOptions: {
            headerTitle: '添加好友',
          },
        },
        Room: {
          screen: Room,
          navigationOptions: ({navigation}) => ({
            headerTitle: `${navigation.state.params.username}`,
          }),
        },
      }, {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
          ...TransitionPresets.SlideFromRightIOS,
        },
      },
  ));
}
