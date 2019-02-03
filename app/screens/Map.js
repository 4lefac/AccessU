// TODO - animate moving to user position/location
// TODO - change announceForAccessibility text to state the user-approximated position
// TODO - replace text buttons with icons
// TODO - prompt location before using map.
//      - if user refuses location, show map without location tracking

import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';
//getting database reference from the config files.
import { db } from '../config/config';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let entrenceRef = db.ref('/Entrences');

const styles = StyleSheet.create({

  bar: {
    position: 'absolute',
    zIndex: 999,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    width: '100%',
  },
  topBar: { top: 30 },
  bottomBar: { bottom: 30 },

  map: { flex: 1 },

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
      },
      //holds the entrences data in an array of objects
      entrences: []
    }
  }

  static navigationOptions = { header: null };

  //when this method is called the user location is updated.
  goToUserPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = parseFloat(position.coords.latitude)
      let long = parseFloat(position.coords.longitude)

      let initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({userPosition: initialRegion})
    }, (error) => alert(JSON.stringify("Please make sure to have location services turned on!")),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
  }
  // This method will only run once in the initial render of the program.
  // This updates the user location before the map is actually rendered
  // on the screen.
  componentWillMount() {
    this.goToUserPosition()
  }
  componentDidMount() {
    //loading the entrance locations from the database into the entrenes array
    entrenceRef.on('value', snapshot => {
      let data = snapshot.val();
      let entrences = Object.values(data);
      this.setState({ entrences });
    });
  }

  render() {
    announceForAccessibility('announce location here for screen readers. There are 3 buttons at the top of the screen and 2 buttons at the bottom of the screen.');

    const { navigate } = this.props.navigation;
    
    // Custom map styling can be generated using https://mapstyle.withgoogle.com
    const mapStyle = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#c4ebbe"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ebdfb6"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#e1c49b"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#9bcdff"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];

    return (
      <View style={{ ...EStyleSheet.absoluteFillObject }}>

          <MapView
          provider={PROVIDER_GOOGLE}
          style={[styles.map]}
          region={this.state.userPosition}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          showsScale={false}
          showsTraffic={false}
          toolbarEnabled={false}
          zoomEnabled={true}
          scrollEnabled={true}
          customMapStyle={mapStyle}
          >
            {this.state.entrences.map(entrence  => (
              <MapView.Marker
              identifier={entrence.id.toString()}
              key={entrence.id.toString()}
              coordinate={entrence.coordinate}
              title={entrence.name}
              onCalloutPress={() => navigate('MarkerInfo')}
              />
            ))}
          </MapView>


          <View style={[styles.bar, styles.topBar]}>

            <TouchableOpacity
            style={[Base.ButtonTouch]}
            accessibilityLabel="Main Menu"
            onPress={() => navigate('Menu')}
            >
              <Text style={[Base.ButtonText]}>
                Menu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[Base.ButtonTouch]}
            accessibilityLabel="Search"
            onPress={() => navigate('Search')}
            >
              <Text style={[Base.ButtonText]}>
                Search
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[Base.ButtonTouch]}
            accessibilityLabel="Find Route"
            onPress={() => navigate('Route')}
            >
              <Text style={[Base.ButtonText]}>
                Find Route
              </Text>
            </TouchableOpacity>

          </View>


          <View style={[styles.bar, styles.bottomBar]}>

            <TouchableOpacity
            style={[Base.ButtonTouch]}
            accessibilityLabel="Recenter location"
            onPress={this.goToUserPosition}
            >
              <Text style={[Base.ButtonText]}>
                Recenter
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[Base.ButtonTouch]}
            accessibilityLabel="Add information or entrances"
            onPress={() => navigate('Add')}
            >
              <Text style={[Base.ButtonText]}>
                Add
              </Text>
            </TouchableOpacity>

          </View>

      </View>
    );
  }

}
