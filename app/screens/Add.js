import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';


export default class Add extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={[Base.Container]}>


        <View style={[Base.Content]}>
          <Text>Add new information or entrances</Text>
        </View>

        <TouchableOpacity
        style={[Base.IconButtonTouch]}
        accessibilityLabel="Back to map"
        onPress={() => navigate('Home')}
        >
          <Text style={[Base.IconButtonText]}>
            close
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

}
