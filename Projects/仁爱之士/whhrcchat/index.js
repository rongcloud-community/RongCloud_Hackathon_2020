/**
 * @format
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import store from './js/store';

export default function Main() {
  return (
      <StoreProvider store={store}>
        <PaperProvider>
          <App/>
        </PaperProvider>
      </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
