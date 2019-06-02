import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import {
  AddPanels,
  MapButton,
  MapCardScroll,
  MapComponent,
  MapSearchResults,
  Settings,
  SideMenu,
  TopBar,
} from '../components';
import {
  Animate,
  ANIMATE_TIME,
  CacheData,
  GetCacheData,
  Theme,
} from '../global';
import LocationSwitch from 'react-native-location-switch';
import { Routes } from '../api/Routes';
import { Auth } from '../api/Auth';
/*
** variables
*/

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let userRegion = {
  latitude: 39.998361,
  longitude: -83.00776,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};

const styles = {
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 0, bottom: -50,
    right: 0, left: 0,
  },
  bar: {
    position: 'absolute',
    zIndex: 3,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    height: '6%',
  },
  barTopPos: (Platform.OS == 'android') ? { top: 40 } : { top: 50 },
  barBottom: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5, paddingRight: 5,
  },
  barBottomPos: { bottom: 70 },
  mapButtonContainer: {
    flex: 0.15,
    aspectRatio: 1,
    padding: 10,
  },
  mapCardScroll: {
    position: 'absolute',
    zIndex: 5,
    bottom: 0,
    left: 0,
  },
}

/*
** screen component
*/

class Map extends Component {
  //header is null we dont want it to show
  static navigationOptions = { header: null }

  state = {
    // used for initial component mount
    userRegion: userRegion,

    locations: [],

    // changes to populate with user login information or stays null
    userInfo: null,

    barTopPos: new Animated.Value(styles.barTopPos.top),
    searchBarTopPos: new Animated.Value(styles.barTopPos.top + 0.065 * height),
    barBottomPos: new Animated.Value(styles.barBottomPos.bottom),

    cardScrollBottomPos: new Animated.Value(-1 * height),
  }

  /*
  ** retrieves locations
  */
  getLocations = () => {
    Routes.GET_map()
        .then((locations) => {
            if (Array.isArray(locations)) {
                this.setState({ locations });
            }
        })
        .catch((e) => { throw e });
  }

  /*
  ** updates the current user region
  */
  updateUserRegion = (region) => {
    region = region || userRegion; // fallback
    userRegion = {
      latitude: parseFloat(region.latitude),
      longitude: parseFloat(region.longitude),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  }

  /*
  ** animates to the current user region
  */
  goToUserRegion = (duration) => {
    LocationSwitch.isLocationEnabled(() => { }, () => {
      LocationSwitch.enableLocationService(1000, true);
    });
    // cache user region
    CacheData('userRegion', userRegion);
    this.MapView.animateToRegion(userRegion, duration);
  }

  /*
  ** animates to a region
  */
  goToRegion = (lat, lng, duration) => {
    let time = duration || ANIMATE_TIME;
    this.MapView.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }, time);
  }

  /*
  ** event when map is pressed
  */
  mapPress = () => {
    // hide keyboard
    Keyboard.dismiss();

    // toggle card scroll
    this.toggleCardScroll(0);

    // clear entrances
    this.MapComponent.MapEntrances.setEntrances([]);

    // clear add panel selected location
    if (this.AddPanels.state.location) {
      this.AddPanels.setState({ location: null });
    }
  }

  /*
  ** toggle the visibility states of the top and bottom bar
  */
  toggleBars = (state) => {
    Animate(this.state.barTopPos, state ? styles.barTopPos.top : -1 * height);
    Animate(this.state.searchBarTopPos, state ? styles.barTopPos.top + 0.065 * height : -1 * height);
    Animate(this.state.barBottomPos, state ? styles.barBottomPos.bottom : -1 * height);
  }

  /*
  ** toggle the visibility state of the card scroll
  */
  toggleCardScroll = (state) => {
    Animate(this.state.cardScrollBottomPos, state ? styles.mapCardScroll.bottom : -1 * height);
  }

  componentWillMount() {
    // get user cache region if available
    GetCacheData('userRegion')
      .then((newUserRegion) => {
        if (newUserRegion) {
          userRegion = newUserRegion;
        }
        this.setState({ userRegion });
      });

    // check to see if user is logged in and if the user isn't logged in then we will ask them to.
    Auth.isSignedIn()
      .then((response) => {
        if (response) {
          this.setState({ userInfo: {} });
        } else {
          this.props.navigation.navigate('LoginScreen');
        }
      });

    // get locations
    this.getLocations();

    // status bar
    // this is needed to remove a warning in ios
    if (Platform.OS == "android") {
      StatusBar.setBackgroundColor('rgba(0, 0, 0, 0)');
      StatusBar.setBarStyle('dark-content');
      StatusBar.setTranslucent(true);
    }
  }

  componentDidMount() {
    // location fallback
    if (this.state.locations.length == 0) {
        this.getLocations();
    }

    // load initial user region
    this.updateUserRegion();
  }

  render() {
    const userInfo = this.state.userInfo || this.props.navigation.getParam('userInfo', null);
    return (
      // prevents soft keyboard from moving layout
      <View onLayout={(e) => this.setState({ height: e.nativeEvent.layout.height })}
        style={[styles.container, { height: this.state.height }]}>

        {/* MAP */}

        <MapComponent
        region={this.state.userRegion}
        onUserLocationChange={(e) => this.updateUserRegion(e.nativeEvent.coordinate)}
        locations={this.state.locations}
        onPress={this.mapPress}
        cardWidth={width}
        thisRef={this}
        ref={ref => { this.MapComponent = ref }}
        _ref={_ref => { this.MapView = _ref }} />

        {/* TOP BAR */}

        <Animated.View pointerEvents='box-none' style={[styles.bar, { top: this.state.barTopPos }]}>
          <TopBar
            navigation={this.props.navigation}
            userInfo={userInfo}
            _ref={ref => { this.TopBar = ref }}
            thisRef={this} />
        </Animated.View>

        {/* SEARCH RESULTS */}

        <Animated.View pointerEvents='box-none' style={[styles.bar,
        { height: height, top: this.state.searchBarTopPos }]}>
          <MapSearchResults thisRef={this}
            ref={ref => { this.MapSearchResults = ref }} />
        </Animated.View>

        {/* BOTTOM BAR */}

        <Animated.View pointerEvents='box-none' style={[styles.bar,
        styles.barBottom, { bottom: this.state.barBottomPos }]}>
          <View style={styles.mapButtonContainer}>
            <MapButton icon='add'
              backgroundColor={Theme.IconColorBackground}
              color={Theme.BackgroundColorContent}
              accessibilityLabel='add or edit entrances'
              onPress={() => {
                if (userInfo) {
                  this.AddPanels.openPanels();
                }
                else {
                  this.props.navigation.navigate('LoginScreen');
                }
              }} />
          </View>
          <View style={styles.mapButtonContainer}>
            <MapButton icon='my-location'
              accessibilityLabel='recenter location'
              onPress={() => this.goToUserRegion(ANIMATE_TIME)} />
          </View>
        </Animated.View>

        {/* CARDS */}

        <MapCardScroll style={[styles.mapCardScroll,
        { bottom: this.state.cardScrollBottomPos }]}
          snapToInterval={width}
          cardHeight={height / 3}
          cardWidth={width - 20}
          cardMargin={10}
          navigation={this.props.navigation}
          ref={ref => { this.MapCardScroll = ref }}
          thisRef={this} />

        {/* SIDE MENU */}

        <SideMenu
          navigation={this.props.navigation}
          userInfo={userInfo}
          height={height}
          width={width}
          size={0.7}
          ref={ref => { this.SideMenu = ref }}
          _ref={this}
        />

        {/* SETTINGS */}

        <Settings
          userInfo={userInfo}
          height={height}
          width={width}
          size={0.5}
          ref={ref => { this.Settings = ref }}
        />

        {/* ADD MENU */}

        <AddPanels thisRef={this}
          mapRef={this}
          ref={ref => { this.AddPanels = ref }} />

      </View>
    )
  }
}

export default Map;