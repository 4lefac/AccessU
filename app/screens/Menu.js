import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/Base';
import Theme from '../styles/Theme';
import {
  Container,
  Section,
  Header,
  IconButton
} from '../components/Components';
import {announceForAccessibility} from 'react-native-accessibility';



const styles = {
  Column: {
    flex: 1,
    alignItems: 'center',
  },
};

export default class Menu extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {

    return (

      <Container grid='row'>

        <Section
        flex={0.7}
        padding={true}
        margin={true}
        >

          <Header style={{textAlign: 'center'}}>AccessU v0.0.1</Header>

          {/*
          <Section padding={true} margin={true} visible={true}>
            <Text style={{color: 'black',height: 20}}>Test text</Text>
          </Section>
          <Section padding={true} margin={true} visible={true}>
            <Text style={{color: 'black',height: 20}}>Test text 2</Text>
          </Section>
          */}

        </Section>

        <Section
        flex={0.3}
        style={{justifyContent: 'space-between'}}
        >

          <IconButton
          accessibilityLabel="Back to map"
          onPress={() => this.props.navigation.goBack()}
          icon='close'
          />

          <IconButton
          accessibilityLabel="Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
          icon='gear'
          />

        </Section>

      </Container>

    );
  }

}
