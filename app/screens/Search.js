import React, { Component } from 'react';
import {
  Text,
  TextInput,
  FlatList
} from 'react-native';
import {announceForAccessibility} from 'react-native-accessibility';
import Theme from '../styles/Theme';
import {
  Container,
  Section,
  IconButton
} from '../components/Components';
import { Routes } from '../api/Routes';




const styles = {
  SearchBar: {
    backgroundColor: Theme.BackgroundColorContent,
    borderRadius: 6,
    padding: 6,
  },
  SuggestedItem: {
    backgroundColor: Theme.BackgroundColorContent,
    borderWidth: 1,
    borderColor: Theme.BackgroundColor,
    padding: 6,
  },
};

class Search extends Component {
  constructor(props) {
    super(props);

    let locations = [];
    Routes.GET_map().then( (markers) => {
      for (let m in markers) locations.push({ key: markers[m].name });
    });

    this.state = {
      text: '',
      suggestions: locations,
    };
  }

  static navigationOptions = { header: null };

  render() {

    announceForAccessibility('Search for a specific location and filter your search on the top left corner.');

    return (

      <Container grid='column' alignment='start'
      style={{justifyContent: 'flex-start'}}
      >

        {/* search and button bar */}
        <Container grid='row' style={{flex: 0.2}}>

          <Section padding={true}>
            <IconButton
            accessibilityLabel="Filter search"
            onPress={() => this.props.navigation.navigate('Filter')}
            icon='filter'
            />
          </Section>

          <Section flex={1} padding={true}>
            <TextInput
            autoComplete='street-address'
            style={styles.SearchBar}
            placeholder="Search"
            autoFocus={true}
            onChangeText={(text) => {

              this.setState({text: text});
            }}
            value={this.state.text}
            onSubmitEditing={() => {alert("Do something with this test: " + this.state.text)}}
            multiline={false}
            clearButtonMode='while-editing'
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

        {/* autocomplete list */}
        <Container grid='row' style={{flex: 1}}>
          <Section flex={1}>

              <FlatList
                style={{padding: 6}}
                data={(()=>{
                  let items = [];
                  // Routes.GET_map().then( (markers) => {
                  //   for (let m in markers) items.push({ key: markers[m].name });
                  // })

                  //this.state.suggestions

                  //this.state.text

                  return items;
                })()}
                renderItem={({item}) =>
                  <Text style={styles.SuggestedItem}>{item.key}</Text>
                }
              />

          </Section>
        </Container>

      </Container>

    );
  }

}

export default Search;
