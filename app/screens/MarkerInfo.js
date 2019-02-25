import React, { Component } from 'react';
//import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
//import EStyleSheet from 'react-native-extended-stylesheet';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import Base from '../styles/Base';
import {
  Text
} from 'react-native';
import {
  Container,
  Section,
  IconButton
} from '../components/Components';
import Theme from '../styles/Theme';


import {announceForAccessibility} from 'react-native-accessibility';


class MarkerInfo extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {

    //const {navigate} = this.props.navigation;

    let data = this.props.navigation.getParam("data", "fallback if unavailable");

    return (

      <Container grid='column'>

        <Section
        flex={1}
        visible={false}
        >
          <Text>Test text 1</Text>
          <Text>Selected location data: {JSON.stringify(data)}</Text>
        </Section>

        <Section
        flex={1}
        visible={false}
        >

          <Text>Test text 1</Text>

          <IconButton
          accessibilityLabel="Back to map"
          onPress={() => this.props.navigation.goBack()}
          icon='close'
          />

        </Section>

      </Container>

  /*    <View style={[Base.Container]}>
        <View style={[Base.Content]}>

          <Text>Don't forget to add a button to navigate to show to the route</Text>

          <Text>Selected location data: {JSON.stringify(data)}</Text>

        </View>

        <TouchableOpacity
        style={[Base.ButtonTouch]}
        accessibilityLabel="Back to map"
        onPress={() => navigate('Map')}
        >
          <Text style={[Base.ButtonText]}>
            <Icon name="close" size={Base.IconButtonSize} style={[Base.IconButtonText]} />
          </Text>
        </TouchableOpacity>

      </View>*/
    );
  }

}

export default MarkerInfo;
