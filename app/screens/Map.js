// TODO - animate moving to user position/location
// TODO - remove Google's default "recenter on user" button in top right corner
// TODO - change announceForAccessibility text to state the user-approximated position
// TODO - replace text buttons with icons
// TODO - prompt location before using map.
//      - if user refuses location, show map without location tracking
import React, {Component} from 'react';
import {View, Dimensions, Text, Overlay, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import EStyleSheet from 'react-native-extended-stylesheet';
import {announceForAccessibility} from 'react-native-accessibility';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  navButton: {
    flex: 0.2,
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  navText: {
    color: '#444',
    textAlign: 'center',
  }
});


export default class Map extends Component {
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

  static navigationOptions = { header: null };

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
    }, (error) => alert(JSON.stringify("Please make sure to have location services turned on!")),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
  }
  //this method will only run once in the initial render of the program. This will update the user location before
  //the map is actually rendered on the screen.
  componentWillMount(){
    this.goToUserPosition()
  }

  render() {
    announceForAccessibility('announce location here for screen readers. There are 3 buttons at the top of the screen and 2 buttons at the bottom of the screen.');

    const {navigate} = this.props.navigation;

    return (
      <View style = {{...EStyleSheet.absoluteFillObject} }>
        {/* top menu bar */}
        <View style={{position: 'absolute', top: 30, zIndex: 999, flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', width: '90%'}}>
            {/* main menu */}
            <TouchableOpacity
            accessibilityLabel="Main Menu"
            style={styles.navButton}
            onPress={() => navigate('Menu')}
            >
              <Text style={styles.navText}>
                Menu
              </Text>
            </TouchableOpacity>
            {/* Search */}
            <TouchableOpacity
            accessibilityLabel="Search"
            style={styles.navButton}
            onPress={() => navigate('Search')}
            >
              <Text style={styles.navText}>
                search
              </Text>
            </TouchableOpacity>
            {/* find route */}
            <TouchableOpacity
            accessibilityLabel="Find route"
            style={styles.navButton}
            onPress={() => {alert('route')}}
            >
              <Text style={styles.navText}>t3</Text>
            </TouchableOpacity>
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
        <View style={{position: 'absolute', bottom: 30, zIndex: 999, flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', width: '80%'}}>
            {/* recenter location */}
            <TouchableOpacity
            accessibilityLabel="Recenter Location"
            style={styles.navButton}
            onPress={this.goToUserPosition}
            >
              <Text style={styles.navText}>
                recenter
              </Text>
            </TouchableOpacity>
            {/* Add info/entrances */}
            <TouchableOpacity
            accessibilityLabel="Add information or entrances"
            style={styles.navButton}
            onPress={() => {alert('add')}}
            >
              <Text style={styles.navText}>t5</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

}
