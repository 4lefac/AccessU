/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default class App extends Component{
  render() {
    return (
      <MapView
        provider = { PROVIDER_GOOGLE }
        style = { styles.container}
        initialRegion={{
          latitude: 39.7392,
          longitude: -104.9903,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
      height: '100%',
      width: '100%',
  }
});
