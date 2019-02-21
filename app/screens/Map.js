// TODO - animate moving to user position/location
// TODO - change announceForAccessibility text to state the user-approximated position

import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';
import {Routes} from '../api/Routes';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import LocationSwitch from 'react-native-location-switch';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


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
      entrances: []
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
  }
  // This method will only run once in the initial render of the program.
  // This updates the user location before the map is actually rendered
  // on the screen.
  componentWillMount() {
    this.goToUserPosition()
  }
  componentDidMount() {
    Routes.GET_map().entrances.then( entrances => {
      this.setState({ entrances });
    })
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
            {this.state.entrances.map ( entrance =>
              <MapView.Marker
              identifier={entrance.id.toString()}
              key={entrance.id.toString()}
              coordinate={{latitude: entrance.coord.lat, longitude: entrance.coord.long}}
              title={entrance.name}
              onCalloutPress={() => navigate('MarkerInfo', {data: this.state.userPosition})}
              />
            )}
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
            onPress={this.goToUserPosition}
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
              Routes.GET_Add(req);
            }}
            >
              <Icon name="plus" size={Base.ButtonSize} style={[Base.ButtonText]} />
            </TouchableOpacity>

          </View>

      </View>
    );
  }

}
