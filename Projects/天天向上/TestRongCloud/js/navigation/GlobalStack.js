import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../pages/Home';
import LoginScreen from '../pages/Login';
import RegisterScreen from '../pages/Register';
import ChatRoomScreen from '../pages/ChatRoom';
import FriendListScreen from '../pages/FriendList';
import AddFriendScreen from '../pages/AddFriend';

const Stack = createStackNavigator();

export default function GlobalStack(initialRouteName) {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}
                         screenOptions={{
                           gestureEnabled: true,
                           ...TransitionPresets.SlideFromRightIOS,
                         }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{title: "登陆"}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{title: "注册"}}/>
          <Stack.Screen name="ChatRoom"
                        component={ChatRoomScreen}
                        options={({route}) => ({title: route.params?.userName})}/>
          <Stack.Screen name="FriendList" component={FriendListScreen} options={{title: "好友列表"}}/>
          <Stack.Screen name="AddFriend" component={AddFriendScreen} options={{title: "添加好友"}}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}
