import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';


export default class Menu extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={[Base.ColumnContainer]}>

        <View style={[Base.ColumnContent]}>

          <View style={[Base.Content]}>
            <Text>Test text here.</Text>
          </View>

        </View>

        <View style={[Base.ColumnContent, {flex: 0.5}]}>
          <TouchableOpacity
          style={[Base.ButtonTouch]}
          accessibilityLabel="Back to map"
          onPress={() => navigate('Home')}
          >
            <Text style={[Base.ButtonText]}>
              back
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

}
