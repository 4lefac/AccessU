import React, { Component } from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard
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
  IconText,
  IconButton,
  Container,
  Section
} from '../components/Components';
// map
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// location enable
import LocationSwitch from 'react-native-location-switch';
// search bar
import { API_KEY_MAP } from '../db';
// UUID v4 generator
import uuidv4 from 'uuid/v4';


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

// Custom map styling can be generated using
// https://mapstyle.withgoogle.com
const mapStyle =
[{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":Theme.Landscape}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":Theme.PointsOfInterest}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":Theme.Highway}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":Theme.Water}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];

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
      locations: [],

      topBarPos: new Animated.Value(styles.topBar.top),
      bottomBarPos: new Animated.Value(styles.bottomBar.bottom),

      searchBarTop: new Animated.Value(-1 * height),
      searchResults: [],

      cardScrollPos: new Animated.Value(-1 * height),

    };

  }

  static navigationOptions = { header: null };

  /*
  ** Returns the last recorded user position
  */
  updateUserRegion = () => {

    let success = (position) => {
      userRegion = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    }

    let error = (error) => {
      // check if location is enabled
      LocationSwitch.isLocationEnabled( () => {}, () => {
        LocationSwitch.enableLocationService(1000, true, () => {
          // on location enable, reload position
          this.updateUserRegion();
        }, () => {});
      });
    }

    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000
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
  ** Toggle top bar visibility based on a provided value of 0 or 1.
  */
  toggleTopBar = (state) => {
    let barTop = state ? styles.topBar.top : -1 * height;
    Animated.timing(this.state.topBarPos, {
      toValue: barTop,
      easing: Easing.linear(),
      duration: ANIMATE_TIME,
    }).start();
  }

  /*
  ** Toggle bottom bar visibility based on a provided value of 0 or 1.
  */
  toggleBottomBar = (state) => {
    let barBottom = state ? styles.bottomBar.bottom :  -1 * height;
    Animated.timing(this.state.bottomBarPos, {
      toValue: barBottom,
      easing: Easing.linear(),
      duration: ANIMATE_TIME,
    }).start();
  }

  /*
  ** Toggles search bar visibility based on a provided state value of 0 or 1.
  */
  toggleSearch = (state) => {
    let searchBarTop = state ? styles.topBar.top : -1 * height;
    // animate search bar
    Animated.timing(this.state.searchBarTop, {
      toValue: searchBarTop,
      easing: Easing.linear(),
      duration: ANIMATE_TIME,
    }).start();
    // animate top bar
    this.toggleTopBar(state ? 0 : 1);
    // if enabled, focus search bar
    this.searchTextInput.focus();
  }

  /*
  ** Toggles callout visibility based on a provided state value of 0 or 1.
  */
  toggleCallout = (state) => {
    let cardScrollBottom = state ? 0 : -1 * height;
    // animate card
    Animated.timing(this.state.cardScrollPos, {
      toValue: cardScrollBottom,
      easing: Easing.linear(),
      duration: ANIMATE_TIME,
    }).start();
    // animate bottom bar
    this.toggleBottomBar(state ? 0 : 1);
  }

  /*
  ** Retrieves and returns entrance/building json asynchronously.
  */
  getLocations = () => {
    Routes.GET_map().then( (locations) => {
      this.setState({ locations: locations });
    })
    .catch( (e) => { throw e })
  }

  /*
  ** Given a string, generates Google Maps search results for that string.
  ** Returns a promise.
  */
  getSearchResults = (str) => {

    return new Promise( (resolve, reject) => {
      // only start populating suggestions if search string is
      // greater than 3 characters long
      if (str.length > 3) {
        let searchURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="
        + str + "&key=" + API_KEY_MAP + "&sessiontoken=" + uuidv4();

        fetch(searchURL).then((res) => { return res.json() })
        .then((results) => {
          // if status is OK
          if (results.status == "OK") resolve( results.predictions );
          else resolve( [] );
        })
        .catch((e) => { throw e });
      }
      else resolve( [] );
    });

  }

  /*
  ** Called once the display/view has been rendered to the screen.
  */
  componentDidMount() {
    if (this.state.locations.length == 0) this.getLocations();
    this.updateUserRegion();

    announceForAccessibility('announce location here for screen readers. There are 3 buttons at the top of the screen and 2 buttons at the bottom of the screen.');
  }

  /*
  ** Rendered content.
  */
  render() {

    return (

      <View onLayout={ (e) => {
      var {height} = e.nativeEvent.layout; this.setState({height})
      }} style={[{position: 'absolute', top: 0, right: 0, bottom: -26, left: 0,
      height: this.state.height}]}>

        {/* MAP */}

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

          {/* LOCATIONS */}

          {this.state.locations.map( location => { return (

            <MapMarker
            key={location.id.toString()}
            id={location.id.toString()}
            accessibilityLabel={location.name}
            latitude={location.coordinates._latitude}
            longitude={location.coordinates._longitude}
            icon='map-marker'
            entrances={location.entrances}
            onPress={() => this.toggleCallout(1)}>
            </MapMarker>

          )})}

          {this.state.locations.map( location => { return (
            location.entrances.map( entrance => { return (

              <MapView.Circle
              key={entrance.locationID}
              center={{
                latitude:entrance.coordinates._latitude,
                longitude:entrance.coordinates._longitude
              }}
              radius={1}
              fillColor="#000"
              >
              </MapView.Circle>

            )})
          )})}

        </MapView>

        {/* CARDS */}

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
          height={(height / 3)} width={(width) - 20} margin={10}
          imageUri='https://www.laurenillumination.com/wp-content/uploads/2017/10/osu-campus-compressor.jpg'
          title='Somewhere on campus'
          style={{ marginBottom: 40 }}
          >
            <Text style={{fontWeight: 'bold'}}>5 accessible entrances</Text>

            <Text>This is a really cool place to be so here's a great description.</Text>

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

        {/* TOP NAVIGATION BAR */}

        <Animated.View style={[styles.bar,
        {top: this.state.topBarPos}]}>

          <MapButton
          accessibilityLabel="Main Menu"
          icon='th-list'
          onPress={() => this.props.navigation.navigate('Menu')}
          />

          <MapButton
          accessibilityLabel="Search"
          icon='search'
          onPress={() => this.toggleSearch(1)}
          />

          <MapButton
          accessibilityLabel="Find Route"
          icon='road'
          onPress={() => this.props.navigation.navigate('Route')}
          />

        </Animated.View>

        {/* BOTTOM NAVIGATION BAR */}

        <Animated.View style={[styles.bar,
        {bottom: this.state.bottomBarPos}]}
        pointerEvents='box-none'
        >

          <MapButton
          accessibilityLabel="Recenter location"
          icon='crosshairs'
          onPress={() => this.goToUserRegion(ANIMATE_TIME)}
          />

          {/* dummy button to add spacing */}
          <View pointerEvents='none' style={{ flex: 0.2 }}>
          <MapButton style={{backgroundColor: Theme.Clear, opacity: 0}}
          accessibilityLabel="" onPress={()=>{}} icon='user'
          iconStyle={{opacity: 0}}/></View>

          <MapButton
          accessibilityLabel="Add information or entrance"
          icon='plus'
          onPress={() => {
            // request
            let req = {
              coordinate: {
                // user location
              },
            };
            // call the Add route
            //Routes.GET_Add(req);
            this.props.navigation.navigate('Add');
          }}
          />

        </Animated.View>

        {/* SEARCH BAR */}

        <Animated.View
        style={{
          position: 'absolute',
          zIndex: 11,
          top: this.state.searchBarTop,
          left: 0,
          width: width,
          padding: 10,
          flexDirection: 'row',
        }}>

          <View style={{ flex: 0.9 }}>

            <TextInput
            placeholder="Search..."
            ref={(search) => { this.searchTextInput = search }}
            style={{
              flex: 1,
              elevation: 1,
              backgroundColor: Theme.BackgroundColorContent,
              borderRadius: 4,
              padding: 7,
              paddingLeft: 10,
              paddingRight: 10,
              margin: 0,
            }}
            onChangeText={(searchBarText) => {

              let results = this.getSearchResults(searchBarText);

              results.then((results) => {

                let suggestions = [];

                for (let i = 0; i < results.length; i++) {
                  suggestions.push(
                    <TouchableOpacity
                    key={results[i].id}
                    accessibilityLabel={results[i].description}
                    onPress={() => {

                      let geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                      results[i].description + "&key=" + API_KEY_MAP;

                      fetch(geocodeURL).then((res) => { return res.json() })
                      .then((results) => {

                        if (results.status == "OK") {
                          let coords = results.results[0].geometry.location;
                          // move to location
                          this.map.animateToRegion({
                            latitude: coords.lat,
                            longitude: coords.long,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                          }, ANIMATE_TIME);
                        }

                      })
                      .catch( (e) => { throw e });
                    }}>
                      <Text
                      numberOfLines={1}
                      style={[
                        {
                          flex: 1,
                          elevation: 1,
                          backgroundColor: Theme.BackgroundColorContent,
                          padding: 10,
                          paddingLeft: 10,
                          paddingRight: 10,
                          marginTop: 1,
                        }
                      ]}>
                        {results[i].description}
                      </Text>
                    </TouchableOpacity>
                  )
                }

                this.setState({searchResults: suggestions});

              })

            }}
            onSubmitEditing={() => {
              // hide soft keyboard
              Keyboard.dismiss();
            }}
            />

            {this.state.searchResults}

          </View>

          <View style={{ flex: 0.13 }}>

            <IconButton
            accessibilityLabel="Close search"
            icon='close'
            onPress={() => {
              // clear search
              this.searchTextInput.clear();
              // clear suggestions
              this.setState({searchResults: []});
              // toggle search bar visibillity
              this.toggleSearch(0);
              // hide soft keyboard
              Keyboard.dismiss();
            }}/>
          </View>

        </Animated.View>

      </View>
    );
  }

}
