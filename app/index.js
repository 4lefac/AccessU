import React, { Component } from 'react';
import { Platform, StatusBar } from "react-native";
//import EStyleSheet from 'react-native-extended-stylesheet';
import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

// screens

import Map from './screens/Map';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import AddedItems from './screens/AddedItems';
import Comments from './screens/Comments';
import MoreInfo from './screens/MoreInfo';
import Settings from './screens/Settings';

//EStyleSheet.build();

// stack navigator(s)

const AppNavigator = createStackNavigator(
  {
    Map: Map,
    LoginScreen: LogIn,
    SignUpScreen: SignUp,
    ProfileScreen: Profile,
    AddedItemsScreen: AddedItems,
    CommentsScreen: Comments,
    MoreInfo: MoreInfo,
    SettingsScreen: Settings,
  },
  {
    initialRouteName: 'Map',
    defaultNavigationOptions: {
      header: 0,
    },
  }
)

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() { return <AppContainer /> }
}

export default App;
