import React, {Component} from 'react';
import {View, Dimensions, Text, Button, Overlay} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import EStyleSheet from 'react-native-extended-stylesheet';

import {FindUserButton} from '../components/Buttons';
import {InputEntrance} from '../components/TextInput';

const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA =0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class Map extends Component {
  static navigationOptions = {
    header: null,
  };
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

  //when this method is called the user location is updated.
  goToUserPosition = () => {
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
  //this method will only run once in the initial render of the program. This will update the user location before
  //the map is actually rendered on the screen.
  componentWillMount(){
    this.goToUserPosition()
  }

  render() {
    //console.log("rendered")
    //console.log(this.state.userPosition)
    return (
      <View style = {{...EStyleSheet.absoluteFillObject} }>
        {/* top menu bar */}
        <View style={{position: 'absolute', top: 30, zIndex: 999, flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', width: '90%'}}>
            <Button
              title="t1"
              accessibilityLabel="Main Menu"
              style={{aspectRatio: 1}}
              onPress={() => alert('menu!')}
            />
            <Button
              title="t2"
              accessibilityLabel="Search"
              style={{aspectRatio: 1}}
              onPress={() => alert('search!')}
            />
            <Button
              title="t3"
              accessibilityLabel="Find Route"
              style={{aspectRatio: 1}}
              onPress={() => alert('route!')}
            />
          </View>
        </View>
        {/* map */}
        <MapView
          provider = { PROVIDER_GOOGLE }
          style = { {flex: 1 }}
          region={this.state.userPosition}
          showsUserLocation={true}
          zoomEnabled={true}
          scrollEnabled={true}
        />
        {/* bottom menu */}

        <InputEntrance/>
        <FindUserButton onPress = {this.goToUserPosition}/>

      </View>
    );
  }

}
