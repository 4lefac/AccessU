import React, { Component } from 'react';
import {
  Text,
  TextInput
} from 'react-native';
import {announceForAccessibility} from 'react-native-accessibility';
import Theme from '../styles/Theme';
import {
  Container,
  Section,
  IconButton
} from '../components/Components';




const styles = {
  SearchBar: {
    backgroundColor: Theme.BackgroundColorContent,
    borderRadius: 6,
    padding: 6,
  },
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  static navigationOptions = { header: null };

  render() {

    announceForAccessibility('Search for a specific location and filter your search on the top left corner.');

    return (

      <Container grid='row' alignment='start'>

        <Container grid='row'  alignment='center'>

          <Section padding={true}>
            <IconButton
            accessibilityLabel="Filter search"
            onPress={() => this.props.navigation.navigate('Filter')}
            icon='filter'
            />
          </Section>

          <Section flex={1} padding={true}>

            <TextInput
            style={styles.SearchBar}
            placeholder="Search"
            autoFocus={true}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={() => {alert("Do something with this test: " + this.state.text)}}
            clearInputMode="always"
            />

          </Section>

          <Section padding={true}>
            <IconButton
            accessibilityLabel="Back to map"
            onPress={() => this.props.navigation.goBack()}
            icon='close'
            />
          </Section>

        </Container>

      </Container>

    );
  }

}

export default Search;
