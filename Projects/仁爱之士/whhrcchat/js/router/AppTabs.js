import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatList from '../containers/ChatList';
import Contacts from '../containers/Contacts';

const Tab = createMaterialBottomTabNavigator();

export default function AppTabs() {
  return (
      <Tab.Navigator activeColor="#FF9800"
                     inactiveColor="#3e2465"
                     barStyle={{backgroundColor: '#ffffff'}}>
        <Tab.Screen name="ChatList" component={ChatList} options={{
          tabBarLabel: '聊天列表',
          tabBarIcon: ({color, size}) => (
              <Ionicons name='chatbubbles-sharp' color={color} size={size}/>
          ),
        }}/>
        <Tab.Screen name="Contacts" component={Contacts} options={{
          tabBarLabel: '好友列表',
          tabBarIcon: ({color, size}) => (
              <Ionicons name='people' color={color} size={size}/>
          ),
        }}/>
      </Tab.Navigator>
  );
}
