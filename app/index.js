import React, { Component } from 'react';
//import EStyleSheet from 'react-native-extended-stylesheet';
import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

// screens

import Map from './screens/Map';
import LogIn from './screens/LogIn';

//EStyleSheet.build();

// stack navigator(s)

const AppNavigator = createStackNavigator(
  {
    Map: Map,
    LoginScreen: LogIn,

  },
  {
    initialRouteName: 'Map',
    defaultNavigationOptions: {
      header: null,
    },
  }
)

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() { return <AppContainer /> }
}

export default App;
