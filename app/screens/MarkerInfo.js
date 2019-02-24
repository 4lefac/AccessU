import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';


export default class MarkerInfo extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {

    const {navigate} = this.props.navigation;

    let data = this.props.navigation.getParam("data", "fallback if unavailable");

    return (
      <View style={[Base.Container]}>
        <View style={[Base.Content]}>

          <Text>Don't forget to add a button to navigate to show to the route</Text>

          <Text>Selected location data: {JSON.stringify(data)}</Text>

        </View>

        <TouchableOpacity
        style={[Base.ButtonTouch]}
        accessibilityLabel="Back to map"
        onPress={() => navigate('Home')}
        >
          <Text style={[Base.ButtonText]}>
            <Icon name="close" size={Base.IconButtonSize} style={[Base.IconButtonText]} />
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

}
