import React, { Component } from 'react';
import {
  Keyboard,
  Platform,
  TextInput,
  View,
} from 'react-native';
import { IconButton } from './';
import { Theme } from '../global';
import uuidv4 from 'uuid/v4'; // uuid v4 generator
import { API_KEY_MAP } from '../db';
let keyboardDelay = null;

const styles = {
  TextInput: {
    fontSize: Theme.FontSize,
    marginTop: Platform.OS === 'ios' ? 13 : 0,
  },
}

class MapSearchBar extends Component {
  state = {
    text: '',
    iconHeight: 0,
  }

  /*
  ** Given an array of results, set the state of the search bar results.
  */
  setResults = results => {
    // set state
    let topBar = this.props.thisRef;
    let map = topBar.props.thisRef;
    map.MapSearchResults.setState({ results });
  }

  /*
  ** Given a string, generates Google Maps search results for that string.
  ** Returns a promise.
  */
  getSearchResults = (str) => {
    return new Promise( (resolve, reject) => {
      // only start populating suggestions if search string is
      // greater than 3 characters long
      if (str.length > 3) {
        let searchURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="
        + str + "&key=" + API_KEY_MAP + "&sessiontoken=" + uuidv4();

        fetch(searchURL).then(res => { return res.json() })
        .then(results => {
          // if status is OK
          if (results.status == "OK") {
            // retrieve only the first 7 results
            resolve( results.predictions.slice(0, 7) );
          } else resolve( [] );
        })
        .catch((e) => { throw e });
      }
      else resolve( [] )
    })
  }

  /*
  ** Get coordinate match based on location description.
  */
  getSearchCoords = (desc) => {
    return new Promise( (resolve, reject) => {

      let geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      desc + "&key=" + API_KEY_MAP;

      fetch(geocodeURL).then(res => { return res.json() })
      .then(results => {
        if (results.status == "OK") {
          resolve(results.results[0].geometry.location);
        } else resolve({ lat: 0, lng: 0 });
      })
      .catch( (e) => { throw e });

    })
  }

  render() {
    return (
      <View>
        <TextInput
        style={[styles.TextInput, this.props.style]}
        placeholder='Search'
        onFocus={() => this.setState({ iconHeight: '100%' })}
        onBlur={() => this.setState({ iconHeight: 0 })}
        onChangeText={text => {
          // save search text
          this.setState({ text });
          // delay to prevent fast typing from generating unecessary queries
          clearTimeout(keyboardDelay);
          keyboardDelay = setTimeout(() => {

            this.getSearchResults(text).then(results => {

              let coords = [];
              for (let result of results) {
                coords.push(this.getSearchCoords(result.description));
              }

              Promise.all(coords).then(coords => {
                // add coords
                for (let i = 0; i < results.length; i++) {
                  results[i].coords = coords[i];
                }
                // set state
                this.setResults(results);
              })

            });

          }, 400);

        }}
        onSubmitEditing={() => {
          clearTimeout(keyboardDelay);
          this.setResults([]);
          Keyboard.dismiss();
        }}
        value={this.state.text} />

        <IconButton icon='close'
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: this.state.iconHeight,
          backgroundColor: Theme.BackgroundColorContent,
        }}
        accessibilityLabel='clear search'
        onPress={() => {
          this.setState({ text: '' });
          this.setResults([]);          
        }} />

      </View>
    )
  }

}

export default MapSearchBar;
