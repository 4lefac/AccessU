import React, { Component } from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Base from '../styles/Base';
import { announceForAccessibility } from 'react-native-accessibility';
import { Routes } from '../api/Routes';
import Theme from '../styles/Theme';
import {
  MapButton,
  MapMarker,
  CardScroll,
  Card,
  IconText
} from '../components/Components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LocationSwitch from 'react-native-location-switch';



const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const ANIMATE_TIME = 500;
// initial position
let userRegion = {
  latitude : 39.998361,
  longitude: -83.00776,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}

const styles = EStyleSheet.create({
  bar: {
    position: 'absolute',
    zIndex: 10,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  bottomBar: { bottom: 40 },
  topBar: { top: 20 },

  // iPhone X top notch
  '@media ios': {
    topBar: { top: 40 },
  },

});



export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      cardScrollPos: new Animated.Value(-1 * height),
      bottomBarPos: new Animated.Value(styles.bottomBar.bottom),
    };

  }

  static navigationOptions = { header: null };

  /*
  ** Returns the users' last position
  */
  updateUserRegion = () => {

    let success = (position) => {
      tempRegion = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      userRegion = tempRegion;
    }

    let error = (error) => {
      // check if location is enabled
      LocationSwitch.isLocationEnabled( () => {}, () => {
        LocationSwitch.enableLocationService(1000, true,
        // get markers if not already existing
        () => {
          if (this.state.markers.length == 0) this.getMarkers();
        },
        () => {
          if (this.state.markers.length == 0) this.getMarkers();
        });
      });
    }

    let options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  /*
  ** Given a time, update the users' current postion and state
  */
  goToUserRegion = (time) => {
    this.updateUserRegion();
    this.map.animateToRegion(userRegion,time);
  }

  /*
  ** Toggles callout visibility based on a provided state value of 0 or 1.
  ** 1 - callout is visible
  ** 0 - callout is hidden
  */
  toggleCallout = (state) => {
    let cardScrollBottom = state ? 0 : -1 * height;
    let barBottom = state ? -1 * height / 2 : styles.bottomBar.bottom;
    Animated.timing(this.state.cardScrollPos, {
      toValue: cardScrollBottom,
      easing: Easing.linear(),
      duration: ANIMATE_TIME,
    }).start();

    Animated.timing(this.state.bottomBarPos, {
      toValue: barBottom,
      easing: Easing.linear(),
      duration: ANIMATE_TIME,
    }).start();
  }

  /*
  ** Retrieves and returns entrance/building json asynchronously.
  */
  getMarkers = () => {
    Routes.GET_map().then( (markers) => {
      this.setState({ markers: markers });
    })
    .catch( (e) => { throw e })
  }

  /*
  ** Called before the display or view is rendered to the screen.
  */
  componentWillMount() {
    this.updateUserRegion();
  }

  /*
  ** Called once the display/view has been rendered to the screen.
  */
  componentDidMount() {
    if (this.state.markers.length == 0) this.getMarkers();
  }

  /*
  ** Rendered content.
  */
  render() {
    announceForAccessibility('announce location here for screen readers. There are 3 buttons at the top of the screen and 2 buttons at the bottom of the screen.');

    // Custom map styling can be generated using https://mapstyle.withgoogle.com
    const mapStyle =
    [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":Theme.Landscape}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":Theme.PointsOfInterest}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":Theme.Highway}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":Theme.Water}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];


    return (

      <View onLayout={ (e) => {
      var {height} = e.nativeEvent.layout; this.setState({height})
      }} style={[{position: 'absolute', top: 0, right: 0, bottom: -26, left: 0,
      height: this.state.height}]}>
{
          // -------------------------------------------------------------------
          // Map
          // -------------------------------------------------------------------
}
          <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={userRegion}
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
          ref={ref => { this.map = ref; }}
          onPress={() => this.toggleCallout(0)}
          >
{
            // -----------------------------------------------------------------
            // Markers
            // -----------------------------------------------------------------
}
            {this.state.markers.map( entrance => { return (
              <MapMarker
              key={entrance.id.toString()}
              id={entrance.id.toString()}
              accessibilityLabel={entrance.name}
              latitude={entrance.coordinates._latitude}
              longitude={entrance.coordinates._longitude}
              icon='map-marker'
              onPress={(event) => {
                  /*
                   ** This is added for ios because whenever the onPress function is called it also calles the map onPress function
                   ** only available work around for this is to call event.stopPropagation();
                  */
                event.stopPropagation(); 
                this.toggleCallout(1);
                //this.props.navigation.navigate('MarkerInfo', {data: this.state.userRegion});
              }}
              >
              </MapMarker>
            )})}

          </MapView>
{
          // -------------------------------------------------------------------
          // Cards
          // -------------------------------------------------------------------
}
          <CardScroll
          snapToInterval={width}
          onScroll={Animated.event(
          [{nativeEvent: { contentOffset: {
            x: this.animation,
          }}}], { useNativeDriver: true }
          )}
          style={[
          {
            position: 'absolute',
            zIndex: 11,
            bottom: this.state.cardScrollPos,
            left: 0,
          }
          ]}>

            {/* title card */}
            <Card
            key={1}
            height={(height / 3)} width={(width) - 20} margin={10}
            imageUri='https://www.laurenillumination.com/wp-content/uploads/2017/10/osu-campus-compressor.jpg'
            title='Somewhere on campus'
            style={{ marginBottom: 40 }}
            >
              <Text style={{fontWeight: 'bold'}}>5 accessible entrances</Text>

              <Text>This is a really cool place to be so here's a great description.</Text>
{/* accessibility should say "swipe to view entrances" */}
              <View style={{ position: 'absolute', right: 0, bottom: 0, padding: 10 }}>
                <Text style={{fontSize: 12}}>Swipe to view entrances</Text>
              </View>
            </Card>



{/* change key to iterative number */}
              <Card
              key={1}
              height={(height / 3)} width={(width) - 20} margin={10}
              imageUri='https://media.gettyimages.com/photos/beautiful-wooden-door-picture-id137142928?s=612x612'
              title='SW entrance'
              style={{ marginBottom: 40}}
              >
                <Text>ramp accessible, electric door, all accessibility types</Text>
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>

                    <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Route')
                    }}>
                      <IconText icon='map-signs' size={-1}
                      style={{
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingRight: 15,
                        paddingLeft: 15,
                        borderRadius: 6,
                        borderWidth: 2,
                        borderColor: Theme.Color,
                      }}>Get Directions</IconText>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('MarkerInfo')
                    }}>
                      <IconText icon='question-circle-o' size={-1}
                      style={{
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingRight: 15,
                        paddingLeft: 15,
                        borderRadius: 6,
                        borderWidth: 2,
                        borderColor: Theme.Color,
                      }}
                      >More Info</IconText>
                    </TouchableOpacity>

                  </View>
                </View>
              </Card>

          </CardScroll>
{
          // -------------------------------------------------------------------
          // Top Navigation Bar
          // -------------------------------------------------------------------
}
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
{
          // -------------------------------------------------------------------
          // Bottom Navigation Bar
          // -------------------------------------------------------------------
}
          <Animated.View style={[styles.bar,
          {bottom: this.state.bottomBarPos}]}
          pointerEvents='box-none'
          >

            <MapButton
            accessibilityLabel="Recenter location"
            onPress={() => this.goToUserRegion(ANIMATE_TIME)}
            icon='crosshairs'
            />

            {/* dummy button to add spacing */}
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
                coordinate: {

                } ,
              };
              // call the Add route
              //Routes.GET_Add(req);
              this.props.navigation.navigate('Add');
            }}
            />

          </Animated.View>

      </View>
    );
  }

}
