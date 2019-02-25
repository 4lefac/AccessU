// TODO - animate moving to user position/location
// TODO - change announceForAccessibility text to state the user-approximated position
//TODO on map marker press, accessibility
//TODO custom mapview callout
//TODO custom mapview location tracking icon

import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';
import {Routes} from '../api/Routes';

// Maps
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import LocationSwitch from 'react-native-location-switch';

//default variables
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const animateToRegionDefaultTime = 500;
const defaultUserRegion = {
  latitude : 39.998361,
  longitude: -83.00776,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}

const styles = EStyleSheet.create({

  bar: {
    position: 'absolute',
    zIndex: 999,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    width: '100%',
  },
  topBar: { top: '$verticalPadding' },
  bottomBar: { bottom: '$verticalPadding' },

  map: { flex: 1 },
  marker: {
    color: '#4FC3F7',
  }
});


export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRegion: defaultUserRegion,
      entrances: [],
    }
  }

  static navigationOptions = { header: null };

  //updates the state without re rendering the map.
  updateUserRegionState = () => {
    var tempRegion = this.getUserRegion();
    this.setState(() => {
      userRegion: tempRegion
    });
  }

  //returns the users last known location
  getUserRegion= () => {
    var tempRegion = this.state.userRegion;
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = parseFloat(position.coords.latitude)
      let long = parseFloat(position.coords.longitude)
      tempRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    }, (error) => {
      // check if location is enabled
      LocationSwitch.isLocationEnabled(
        () => { /* location is already enabled so this should never execute */ },
        () => {
          LocationSwitch.enableLocationService(1000, true,
            () => {/* location turned on */ },
            () => {/* location kept off */ },
          );
        },
      );
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
    
    return tempRegion;
  }

  //goes to users current postion and updates the state
  goToUserRegion = (time) => {
    this.updateUserRegionState();
    this.map.animateToRegion(this.state.userRegion,time);
  }

  // This method will only run once in the initial render of the program.
  // This updates the user location before the map is actually rendered
  // on the screen.
  componentWillMount() {
    this.setState(this.getUserRegion());
  }
  componentDidMount() {
    // Routes.GET_map().entrances.then( entrances => {
    //   this.setState({ entrances });
    // })
    //entrances = Routes.GET_map();

  }



  render() {
    announceForAccessibility('announce location here for screen readers. There are 3 buttons at the top of the screen and 2 buttons at the bottom of the screen.');

    const { navigate } = this.props.navigation;

    // Custom map styling can be generated using https://mapstyle.withgoogle.com
    const mapStyle = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#c4ebbe"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ebdfb6"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#e1c49b"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#9bcdff"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];

    return (
      <View onLayout={(event) =>
      {var {height} = event.nativeEvent.layout; this.setState({height}) }}
      style={[{ ...EStyleSheet.absoluteFillObject }, {height: this.state.height}]}>

          <MapView
          provider={PROVIDER_GOOGLE}
          style={[styles.map]}
          region={this.state.userRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          showsScale={false}
          showsTraffic={false}
          toolbarEnabled={false}
          zoomEnabled={true}
          scrollEnabled={true}
          customMapStyle={mapStyle}
          ref={ref => { this.map = ref; }}
          >

            {this.state.entrances.map( entrance =>
              <MapView.Marker
              accessibilityLabel={entrance.name}
              identifier={entrance.id.toString()}
              key={entrance.id.toString()}
              coordinate={{
              latitude: entrance.coord.lat,
              longitude: entrance.coord.long
              }}
              >
                <Icon name="map-marker" size={Base.ButtonSize + 10} style={[Base.ButtonText, styles.marker]} />

                <MapView.Callout
                tooltip={true}
                onPress={() => navigate('MarkerInfo', {data: this.state.userRegion})}
                >

                  <View style={[{flex: 1}]}>
                    <View style={[{height: 50, width: 50, backgroundColor: 'red'}]}>
                      <Text>Go to this place!</Text>
                    </View>
                  </View>

                </MapView.Callout>

              </MapView.Marker>
            )}
{/*
  title={entrance.name}
  <MapView.Callout
  >
    <Icon name="map" size={Base.ButtonSize + 30} style={[Base.ButtonText, styles.marker]} />
  </MapView.Callout>
  */}

          </MapView>

          <View style={[styles.bar, styles.topBar]}>

            <TouchableOpacity
            style={[Base.ButtonTouch]}
            accessibilityLabel="Main Menu"
            onPress={() => navigate('Menu')}
            >
              <Icon name="list-ul" size={Base.ButtonSize} style={[Base.ButtonText]} />
            </TouchableOpacity>

            <TouchableOpacity
            style={[Base.ButtonTouch]}
            accessibilityLabel="Search"
            onPress={() => navigate('Search')}
            >
              <Icon name="search" size={Base.ButtonSize} style={[Base.ButtonText]} />
            </TouchableOpacity>

            <TouchableOpacity
            style={[Base.ButtonTouch]}
            accessibilityLabel="Find Route"
            onPress={() => navigate('Route')}
            >
              <Icon name="map-signs" size={Base.ButtonSize} style={[Base.ButtonText]} />
            </TouchableOpacity>

          </View>


          <View style={[styles.bar, styles.bottomBar]}>

            <TouchableOpacity
            style={[Base.ButtonTouch]}
            accessibilityLabel="Recenter location"
            onPress={() => this.goToUserRegion(animateToRegionDefaultTime)}
            >
              <Icon name="crosshairs" size={Base.ButtonSize} style={[Base.ButtonText]} />
            </TouchableOpacity>

            <TouchableOpacity
            style={[Base.ButtonTouch]}
            accessibilityLabel="Add information or entrances"
            onPress={() => {
              /*
              ** The request object includes parameters and other stuff we
              ** want to pass to the server. For example, we might want to
              ** pass the id of the entrance we just clicked, or the name
              ** of a user. Then in the Routes.js file, we will figure out
              ** what to do with that actual information.
              */
              let req = {
                navigate: navigate,
              }
              // call the Add route
              //Routes.GET_Add(req);
            }}
            >
              <Icon name="plus" size={Base.ButtonSize} style={[Base.ButtonText]} />
            </TouchableOpacity>

          </View>

      </View>
    );
  }

}
