import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Container,
  Section,
  Header,
  IconButton
} from '../components';
import Theme from '../styles/Theme';
import { announceForAccessibility } from 'react-native-accessibility';

const styles = {
  text: {
    color: Theme.Color,
    height: 20
  }
}



class Menu extends Component {

  state = {
    // menu states
  }

  render() {
    announceForAccessibility('Main menu');

    return (

      <Container grid='row'>

        <Section flex={0.7} padding={true} margin={true}>
          <Header style={{ textAlign: 'center' }}>AccessU v0.0.1</Header>

          <Section padding={true} margin={true} visible={true}>
            <Text style={styles.text}>Welcome to the menu</Text>
          </Section>

        </Section>

        <Section flex={0.3} style={{ justifyContent: 'space-between' }}>

          <IconButton icon='close'
          accessibilityLabel="Back to map"
          onPress={() => this.props.navigation.goBack()}
          />

          <IconButton icon='gear'
          accessibilityLabel="Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
          />

        </Section>

      </Container>

    );
  }

}

export default Menu;
