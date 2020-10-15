import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import ChatListScreen from '../views/ChatList';
import ContactsScreen from '../views/Contacts';
import MeScreen from '../views/Me';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
      <Tab.Navigator tabBarOptions={{
        activeTintColor: '#27918e',
      }}>
        <Tab.Screen name="ChatList" component={ChatListScreen} options={{
          tabBarLabel: '聊天',
          tabBarIcon: ({color, size}) => (
              <Fontisto name='hipchat' color={color} size={size}/>
          ),
        }}/>
        <Tab.Screen name="Contacts" component={ContactsScreen} options={{
          tabBarLabel: '通讯录',
          tabBarIcon: ({color, size}) => (
              <AntDesign name='contacts' color={color} size={size}/>
          ),
        }}/>
        <Tab.Screen name="Me" component={MeScreen} options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color, size}) => (
              <Entypo name='user' color={color} size={size}/>
          ),
        }}/>
      </Tab.Navigator>
  );
}
