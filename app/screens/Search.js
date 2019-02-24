// TODO - clear input
// TODO - dynamic input

import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';
import {API_KEY} from '../db.js';

// Search
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const styles = EStyleSheet.create({
  searchbar: {
    flex: 1,
    width: '100%',
    borderRadius: 4,
    backgroundColor: 'white',
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  static navigationOptions = { header: null };

  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={[Base.Container]}>

        <View style={[Base.Content, { backgroundColor: 'rgba(0,0,0,0)', width: '100%' }]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>

            <TouchableOpacity
            style={[Base.IconButtonTouch]}
            accessibilityLabel="Filter search"
            onPress={() => navigate('Filter')}
            >
              <Icon name="filter" size={Base.IconButtonSize} style={[Base.IconButtonText]} />
            </TouchableOpacity>

            <TextInput
            style={styles.searchbar}
            placeholder="Search"
            autoFocus={true}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={() => {alert("Do something with this test: " + this.state.text)}}
            clearInputMode="always"
            />

{/*
            <GooglePlacesAutocomplete
                  placeholder='Search'
                  minLength={2} // minimum length of text to search
                  autoFocus={false}
                  returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                  listViewDisplayed='auto'    // true/false/undefined
                  fetchDetails={true}
                  renderDescription={row => row.description} // custom description render
                  onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                  }}

                  getDefaultValue={() => ''}

                  query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: API_KEY,
                    language: 'en', // language of the results
                    types: '(cities)' // default: 'geocode'
                  }}

                  styles={{
                    textInputContainer: {
                      width: '100%'
                    },
                    description: {
                      fontWeight: 'bold'
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb'
                    }
                  }}

                  currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                  currentLocationLabel="Current location"
                  nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                  GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                  }}
                  GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'
                  }}

                  filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                  debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                  renderLeftButton={()  => <Text>Yo</Text>}
                  renderRightButton={() => <Text>Custom text after the input</Text>}
                />
*/}




            <TouchableOpacity
            style={[Base.IconButtonTouch]}
            accessibilityLabel="Back to map"
            onPress={() => {navigate('Home')}}
            >
              <Text style={[Base.IconButtonText]}>
                <Icon name="close" size={Base.IconButtonSize} style={[Base.IconButtonText]} />
              </Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={[Base.Content]}>
          <Text>Suggestions</Text>
          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
        </View>
      </View>
    );
  }

}
