import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './views/Login';
import MainScreen from './views/Main';
import RegisterScreen from './views/Register';
import SearchScreen from './views/Search';
import AddressBookScreen from './views/AddressBook';
import ChatScreen from './views/Chat';

export default function () {
  return createAppContainer(createStackNavigator({
        Login: {
          screen: LoginScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
        Main: {
          screen: MainScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
        Register: {
          screen: RegisterScreen,
          navigationOptions: {
            headerTitle: '注册',
            headerStyle: {backgroundColor: '#7986cb'},
            headerTintColor: '#ffffff',
          },
        },
        Search: {
          screen: SearchScreen,
          navigationOptions: {
            headerTitle: '搜索',
            headerStyle: {backgroundColor: '#7986cb'},
            headerTintColor: '#ffffff',
          },
        },
        AddressBook: {
          screen: AddressBookScreen,
          navigationOptions: {
            headerTitle: '通讯录',
            headerStyle: {backgroundColor: '#7986cb'},
            headerTintColor: '#ffffff',
          },
        },
        Chat: {
          screen: ChatScreen,
          navigationOptions: ({navigation}) => ({
            headerTitle: `${navigation.state.params.name}`,
            headerStyle: {backgroundColor: '#7986cb'},
            headerTintColor: '#ffffff',
          }),
        },
      },
      {
        initialRouteName: 'Login',
      }));
}
