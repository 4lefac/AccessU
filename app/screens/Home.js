import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {announceForAccessibility} from 'react-native-accessibility';

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});




const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA =0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO




export default class Home extends Component {
  
  static navigationOptions = { header: null };

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
    }, (error) => alert(JSON.stringify("Please Turn on Location Services")),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
  }
  //this method will only run once in the initial render of the program. This will update the user location before 
  //the map is actually rendered on the screen.
  componentWillMount(){
    this.goToUserPosition()
  }


  render() {
    announceForAccessibility('Welcome to AccessU. Press the bar at the bottom of the screen to go to the map.');

    const {navigate} = this.props.navigation;
    return (
      <View
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
      >
        {/* header */}
        <View style={[styles.section, {backgroundColor: 'red'}]}>
          <TouchableOpacity
            style={styles.button}
            accessibilityLabel="Sign in"
            onPress={() => alert('sign in')}
          >
            <Text style={styles.text}>Sign in</Text>
          </TouchableOpacity>
        </View>
        {/* body */}
        <View style={[styles.section, {backgroundColor: 'blue'}]}>
          <Text style={styles.text}>This is a test.</Text>
        </View>
        {/* footer */}
        <View style={[styles.section, {backgroundColor: 'green'}]}>
          <TouchableOpacity
            style={styles.button}
            accessibilityLabel="Go to the map"
            onPress={() => navigate('Map')}
          >
            <Text style={styles.text}>Go to the map</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}
