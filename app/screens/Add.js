import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';


export default class Add extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {

    const {navigate} = this.props.navigation;

    let coordinates = this.props.navigation.getParam("coordinates", {longitude: 0, latitude: 0});

    return (
      <View style={[Base.Container]}>


        <View style={[Base.Content]}>
          <Text>
            You have chosen this location:
          </Text>
          <Text>
            longitude: {coordinates.longitude}
          </Text>
          <Text>
            latitude: {coordinates.latitude}
          </Text>
        </View>

        <TouchableOpacity
        style={[Base.IconButtonTouch]}
        accessibilityLabel="Back to map"
        onPress={() => navigate('Map')}
        >
          <Text style={[Base.IconButtonText]}>
            <Icon name="close" size={Base.IconButtonSize} style={[Base.IconButtonText]} />
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

}
