import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StyleSheet} from 'react-native';

import {createAppContainer, createStackNavigator} from 'react-navigation';

// screens
import Search from './screens/Search';
import Map from './screens/Map';


EStyleSheet.build({
  // global styles
  $white: '#FFFFFF',
  $inputText: '#000000',
  $background: '#ccc',
});

const App = createAppContainer(
  // screen navigator
  createStackNavigator(
    {
      Home: {screen: Map},
      Search: {screen: Search},
    },
    {
      headerMode: 'screen',
    }
  )
);

export default App;
