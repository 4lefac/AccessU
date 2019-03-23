import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Container,
  Section,
  Header,
  IconButton
} from '../components';
import { announceForAccessibility } from 'react-native-accessibility';



class Settings extends Component {

  state = {
    // setting states
  }

  render() {
    announceForAccessibility('Settings menu');

    return (

      <Container grid='row'>

        <Section flex={0.7} padding={true} margin={true}>
          <Header style={{ textAlign: 'center' }}>Settings</Header>
          <Section padding={true} margin={true} visible={true}>

            <Text>Settings will go here</Text>

          </Section>
        </Section>

        <Section flex={0.3}>
          <IconButton
          accessibilityLabel="Back to menu"
          onPress={() => this.props.navigation.goBack()}
          icon='close'
          />
        </Section>

      </Container>

    );
  }

}

export default Settings;
