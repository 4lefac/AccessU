import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createAppContainer, createStackNavigator } from 'react-navigation';

// screens

import Add from './screens/Add';
import Map from './screens/Map';
import MarkerInfo from './screens/MarkerInfo';
import Menu from './screens/Menu';
import Route from './screens/Route';
import Settings from './screens/Settings';

// screen transition configuration

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 450,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [-1 * width, 0],
      })

      return { transform: [ { translateX } ] }
    },
  }
}

// Global style variables

EStyleSheet.build();

// stack navigator(s)

const AppNavigator = createStackNavigator(
  {
    Add: Add,
    Map: Map,
    MarkerInfo: MarkerInfo,
    Menu: Menu,
    Route: Route,
    Settings: Settings,
  },
  {
    initialRouteName: 'Map',
    transitionConfig,
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
