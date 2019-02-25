// TODO - animate moving to user position/location
// TODO - change announceForAccessibility text to state the user-approximated position
//TODO on map marker press, accessibility
//TODO custom mapview callout
//TODO custom mapview location tracking icon

import React, { Component } from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Base from '../styles/Base';
import { announceForAccessibility } from 'react-native-accessibility';
import { Routes } from '../api/Routes';
import Theme from '../styles/Theme';
import {
  MapButton,
  MapMarker
} from '../components/Components';
import MapView, {
  Animated,
  Marker,
  Callout,
  PROVIDER_GOOGLE
} from 'react-native-maps';
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
    width: '100%',
    justifyContent: 'space-evenly',
  },
  // account for iPhone X top notch
  topBar: { top: '2%' },
  '@media ios': { topBar: { top: '5%' }, },
  bottomBar: { bottom: '5%' },
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
      entrances: [],
    }

  }

  static navigationOptions = { header: null };

  //when this method is called the user location is updated.
  goToUserPosition = () => {

    let success = (pos) => {
      let initialRegion = {
        latitude: parseFloat(pos.coords.latitude),
        longitude: parseFloat(pos.coords.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      // animate
      /*
      this.refs.map.animateCamera({
        camera: this.refs.map.getCamera(),
        duration: 2000,
      });
      */

      this.setState({ userPosition: initialRegion });
    }

    let error = (error) => {
      // check if location is enabled
      LocationSwitch.isLocationEnabled( () => {}, () => {
        LocationSwitch.enableLocationService(1000, true);
      });
    }

    let options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 500,
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

  }

  // This method will only run once in the initial render of the program.
  // This updates the user location before the map is actually rendered
  // on the screen.
  componentWillMount() {
    this.goToUserPosition()
  }
  componentDidMount() {
    let pins = [];
    Routes.GET_map()
    .then( (markers) => {
      for (let m in markers) pins.push(markers[m]);
      this.setState({entrances: pins});
    })
    // this should never call since it would throw an error in the route first
    .catch( (e) => { throw e })
  }

  render() {
    announceForAccessibility('announce location here for screen readers. There are 3 buttons at the top of the screen and 2 buttons at the bottom of the screen.');

    const { navigate } = this.props.navigation;
    const { push } = this.props.navigation;

    // Custom map styling can be generated using https://mapstyle.withgoogle.com
    const mapStyle =
    [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":Theme.Landscape}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":Theme.PointsOfInterest}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":Theme.Highway}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":Theme.Water}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];


    return (

      <View onLayout={ (e) => {
      var {height} = e.nativeEvent.layout; this.setState({height})
      }} style={[{position: 'absolute', top: 0, right: 0, bottom: -26, left: 0,
      height: this.state.height}]}>

          <MapView.Animated
          ref="map"
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={this.state.userPosition}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          showsScale={false}
          showsTraffic={false}
          toolbarEnabled={false}
          zoomEnabled={true}
          pitchEnabled={false}
          scrollEnabled={true}
          customMapStyle={mapStyle}
          >

            {/* display each marker */}
            {this.state.entrances.map( entrance =>

              <MapMarker
              key={entrance.id.toString()}
              id={entrance.id.toString()}
              accessibilityLabel={entrance.name}
              latitude={entrance.coordinates._latitude}
              longitude={entrance.coordinates._longitude}
              icon='map-marker'
              onPressCallout={() => navigate('MarkerInfo', {data: this.state.userPosition})}
              >
              </MapMarker>

            )}

          </MapView.Animated>

          <View style={[styles.bar, styles.topBar]}>

            <MapButton
            accessibilityLabel="Main Menu"
            onPress={() => this.props.navigation.navigate('Menu')}
            icon='th-list'
            />

            <MapButton
            accessibilityLabel="Search"
            onPress={() => this.props.navigation.navigate('Search')}
            icon='search'
            />

            <MapButton
            accessibilityLabel="Find Route"
            onPress={() => this.props.navigation.navigate('Route')}
            icon='road'
            />

          </View>


          <View style={[styles.bar, styles.bottomBar]}>

            <MapButton
            accessibilityLabel="Recenter location"
            onPress={this.goToUserPosition}
            icon='crosshairs'
            />

            {/* dummy button to add spacing (this is a hacky solution!) */}
            <MapButton
            style={{backgroundColor: Theme.Clear, opacity: 0}}
            accessibilityLabel=""
            onPress={()=>{}}
            icon='user'
            iconStyle={{opacity: 0}}
            />

            <MapButton
            accessibilityLabel="Add information or entrance"
            icon='plus'
            onPress={() => {
              // request
              let req = {
                navigate: navigate,
              }
              // call the Add route
              //Routes.GET_Add(req);
              this.props.navigation.navigate('Add');
            }}
            />

          </View>

      </View>
    );
  }

}
