import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Container,
  Section,
  IconButton
} from '../components';
import { announceForAccessibility } from 'react-native-accessibility';



class Route extends Component {

  render() {

    return (

      <Container>

        <Section padding={true} margin={true} visible={true}>
          <Text>this will include two search bars</Text>
        </Section>

        <IconButton icon='close'
        accessibilityLabel="Back to map"
        onPress={() => this.props.navigation.goBack()} />

      </Container>

    );
  }

}

export default Route;
