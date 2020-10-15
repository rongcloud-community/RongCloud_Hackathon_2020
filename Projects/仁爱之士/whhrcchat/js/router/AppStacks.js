import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Search from '../containers/Search';
import SearchResult from '../containers/SearchResult';
import AppTabs from './AppTabs';
import Room from '../containers/Room';

const Stack = createStackNavigator();

export default function AppStacks() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Login'}
                         screenOptions={{
                           gestureEnabled: true,
                           ...TransitionPresets.SlideFromRightIOS,
                         }}>
          <Stack.Screen name="Home" component={AppTabs} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerTitle: '注册'}}/>
          <Stack.Screen name="Search" component={Search} options={{headerTitle: '搜索用户'}}/>
          <Stack.Screen name="SearchResult" component={SearchResult} options={{headerTitle: '搜索结果'}}/>
          <Stack.Screen name="Room"
                        component={Room}
                        options={({route}) => ({title: route.params?.targetName})}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
