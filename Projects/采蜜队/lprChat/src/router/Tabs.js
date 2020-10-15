import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConversationList from '../pages/ConversationList';
import FriendList from '../pages/FriendList';
import Profile from '../pages/Profile';

export default createBottomTabNavigator({
  ConversationList: {
    screen: ConversationList,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({tintColor}) => (
          <AntDesign name='wechat' color={tintColor} size={26}/>
      ),
    },
  },
  FriendList: {
    screen: FriendList,
    navigationOptions: {
      tabBarLabel: '好友列表',
      tabBarIcon: ({tintColor}) => (
          <FontAwesome5 name='user-friends' color={tintColor} size={26}/>
      ),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: '个人信息',
      tabBarIcon: ({tintColor}) => (
          <AntDesign name='profile' color={tintColor} size={26}/>
      ),
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: '#8BC34A',
  },
});
