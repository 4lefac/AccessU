import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA =0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class Home extends Component{
    
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
  updateUserLocation(){
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
    this.updateUserLocation()
  }
  
  render() {
    return (
      <View style = { styles.container }>
        <MapView
          provider = { PROVIDER_GOOGLE }
          style = { styles.container }
          region={this.state.userPosition}
          showsUserLocation={true}/>
      </View>
    );
  }
  
}

const styles = EStyleSheet.create({
  container: {
    ...EStyleSheet.absoluteFillObject,
  },
});
