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

export default class Home extends Component {
  static navigationOptions = { header: null };

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
