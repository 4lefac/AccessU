import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';


export default class Route extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {

    const {navigate} = this.props.navigation;

    return (

      <View style={[Base.Container]}>

        <View style={[Base.Content]}>
          <Text>this screen is to route to different places</Text>
        </View>

        <TouchableOpacity
        style={[Base.IconButtonTouch]}
        accessibilityLabel="Back to map"
        onPress={() => navigate('Home')}
        >
          <Text style={[Base.IconButtonText]}>
            <Icon name="close" size={Base.IconButtonSize} style={[Base.IconButtonText]} />
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

}
