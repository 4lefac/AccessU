import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Section,
  IconButton
} from '../components/Components';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';
import Theme from '../styles/Theme';

export default class Route extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {
    const {navigate} = this.props.navigation;

    return (

      <Container>

        <Section padding={true} margin={true} visible={true}>
          <Text>this will include two search bars</Text>
        </Section>

        <IconButton
        accessibilityLabel="Back to map"
        onPress={() => navigate('Home')}
        icon='close'
        />

      </Container>

    );
  }

}
