/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Dimensions} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA =0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userPosition: {
        latitude : 39.998361,
        longitude: -83.00776,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    }
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA      
      }

      this.setState({userPosition: initialRegion})
    }, (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
  }
  render() {
    return (
      <MapView
        provider = { PROVIDER_GOOGLE }
        style = { styles.container}
        region={this.state.userPosition}
        showsUserLocation={true}>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      height: '100%',
      width: '100%',
  }
});
