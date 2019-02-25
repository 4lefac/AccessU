

import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {createAppContainer, createStackNavigator} from 'react-navigation';

// screens

import Add from './screens/Add';
import Filter from './screens/Filter';
import Map from './screens/Map';
import MarkerInfo from './screens/MarkerInfo';
import Menu from './screens/Menu';
import Route from './screens/Route';
import Search from './screens/Search';


// Global style variables
EStyleSheet.build({
  // account for iPhone X top notch
  $verticalPadding: '2%',
  '@media ios': { $verticalPadding: '5%' }
});

// screen navigator

const App = createAppContainer(

  createStackNavigator({

      Home: {screen: Map},

      Add: {screen: Add},
      Filter: {screen: Filter},
      MarkerInfo: {screen: MarkerInfo},
      Menu: {screen: Menu},
      Route: {screen: Route},
      Search: {screen: Search},


  }, { headerMode: 'screen' })
);

export default App;
