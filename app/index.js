

import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createAppContainer, createStackNavigator } from 'react-navigation';

// screens

import Add from './screens/Add';
import Filter from './screens/Filter';
import Map from './screens/Map';
import MarkerInfo from './screens/MarkerInfo';
import Menu from './screens/Menu';
import Route from './screens/Route';
import Search from './screens/Search';


// Global style variables
EStyleSheet.build();

// screen navigator

const AppNavigator = createStackNavigator(
  {
    Add: Add,
    Filter: Filter,
    Map: Map,
    MarkerInfo: MarkerInfo,
    Menu: Menu,
    Route: Route,
    Search: Search,
  },
  {
    initialRouteName: 'Map',
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() { return <AppContainer /> }
}
