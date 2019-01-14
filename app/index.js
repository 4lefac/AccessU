import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StyleSheet} from 'react-native';

import {createAppContainer, createStackNavigator} from 'react-navigation';

// screens
import Home from './screens/Home';
import Map from './screens/Map';


EStyleSheet.build({
    //put global styles here
    $white: '#FFFFFF',
    $inputText: '#000000',
});

const App = createAppContainer(
  // screen navigator
  createStackNavigator(
    {
      Home: {screen: Home},
      Map: {screen: Map},
    },
    {
      headerMode: 'screen',
    }
  )
);

export default App;
