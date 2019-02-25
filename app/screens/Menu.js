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

    const {navigate} = this.props.navigation;

    return (

      <Container grid='row'>

        <Section
        flex={0.7}
        padding={true}
        margin={true}
        visible={true}
        >
          <Text>left pane</Text>
        </Section>

        <Section
        flex={0.3}
        padding={true}
        margin={true}
        >

          <IconButton
          accessibilityLabel="Back to map"
          onPress={() => navigate('Home')}
          icon='close'
          />

        </Section>

      </Container>

      /*
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
      */

    );
  }

}
