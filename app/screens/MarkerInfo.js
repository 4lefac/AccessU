import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';


export default class MarkerInfo extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={[Base.Container]}>
        <View style={[Base.Content]}>

          <Text>Don't forget to add a button to navigate to show to the route</Text>

        </View>

        <TouchableOpacity
        style={[Base.ButtonTouch]}
        accessibilityLabel="Back to map"
        onPress={() => navigate('Home')}
        >
          <Text style={[Base.ButtonText]}>
            Go back
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

}
