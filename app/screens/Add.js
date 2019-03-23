import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  IconButton,
  Section,
} from '../components';
import { announceForAccessibility } from 'react-native-accessibility';



class Add extends Component {

  render() {

    let coordinates = this.props.navigation.getParam("coordinates", {longitude: 0, latitude: 0});

    return (
      <Container>


        <Section>
          <Text>You have chosen this location:</Text>
          <Text>longitude: {coordinates.longitude}</Text>
          <Text>latitude: {coordinates.latitude}</Text>
        </Section>

        <IconButton icon='close'
        accessibilityLabel="Back to map"
        onPress={() => this.props.navigation.goBack()}
        />

      </Container>
    );
  }

}

export default Add;
