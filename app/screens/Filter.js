//TODO add filter options
//TODO enable or disable options based on get request

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {announceForAccessibility} from 'react-native-accessibility';
import {
  Container,
  Section,
  Header,
  IconButton,
  RadioButton,
  IconText
} from '../components/Components';
import Theme from '../styles/Theme';



const styles = {
  CloseButton: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 10,
  },
  RadioButton: {
    paddingTop: 5,
    paddingBottom: 5,
  },
};

export default class Filter extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {

    announceForAccessibility('Filter options');

    const {navigate} = this.props.navigation;

    return (

      <Container>

        <IconButton
        style={styles.CloseButton}
        accessibilityLabel="Close filter options"
        onPress={() => navigate('Search')}
        icon="close"
        />

        <Section padding={true} margin={true}>

          {/* filter by type */}
          <Header>Filter By Type</Header>

          <RadioButton
          style={styles.RadioButton}
          accessibilityLabel="Filter search for wheelchair ramp"
          onToggle={(value) => { /* add functionality here*/ }}
          >
            <IconText icon='wheelchair'>Ramp accessible</IconText>
          </RadioButton>

          <RadioButton
          style={styles.RadioButton}
          accessibilityLabel="Filter search for automatic door"
          onToggle={(value) => { /* add functionality here*/ }}
          >
            <IconText icon='power-off'>Automatic door</IconText>
          </RadioButton>

          <RadioButton
          style={styles.RadioButton}
          accessibilityLabel="Filter search for braille signs"
          onToggle={(value) => { /* add functionality here*/ }}
          >
            <IconText icon='braille'>Braille signs</IconText>
          </RadioButton>


          {/* filter by info */}
          <Header>Filter By Info</Header>

        </Section>

      </Container>

    );

  }

}
