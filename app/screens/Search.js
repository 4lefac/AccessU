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
import MapView, {
  PROVIDER_GOOGLE
} from 'react-native-maps';

import {
  GooglePlacesAutocomplete
} from 'react-native-google-places-autocomplete';
import { Routes } from '../api/Routes';
import { API_KEY_MAP } from '../db';



class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  static navigationOptions = { header: null };

  render() {

    announceForAccessibility('Search for a specific location and filter your search on the top left corner.');

    return (

      <Container grid='column' alignment='start'
      style={{justifyContent: 'flex-start'}}
      >

        <Container grid='row' style={{flex: 0.2}}>

        <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={3}
        query={{
          // https://developers.google.com/places/web-service/autocomplete
          // key
          key: API_KEY_MAP,
          // return local places first
          types: ['locality', 'geocode']
        }}

        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          alert(JSON.stringify(data), JSON.stringify(details));
        }}
        style={{backgroundColor: 'red', flex: 1}}
        />

        </Container>

        {/* autocomplete list */}
        <Container grid='row' style={{flex: 1}}>
          <Section flex={1}>
          </Section>
        </Container>

      </Container>

    );
  }

}

export default Search;
