import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginScreen from '../views/Login';
import RegisterScreen from '../views/Register';
import AboutScreen from '../views/About';
import NewFriendListScreen from '../views/NewFriendList';
import ChatRoomScreen from '../views/ChatRoom';
import Tabs from './Tabs';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Login'}
                         screenOptions={{
                           gestureEnabled: true,
                           ...TransitionPresets.SlideFromRightIOS,
                         }}>
          <Stack.Screen name="Main" component={Tabs} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="About" component={AboutScreen} options={{headerTitle: '关于'}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{
            headerTransparent: true,
            headerTitle: null,
            headerTintColor: '#ffffff',
          }}/>
          <Stack.Screen name="NewFriendList" component={NewFriendListScreen} options={{headerTitle: '新的朋友'}}/>
          <Stack.Screen name="ChatRoom" component={ChatRoomScreen}
                        options={({route}) => ({title: route.params?.userName})}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
