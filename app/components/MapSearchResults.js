import React, { Component } from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Theme,
} from '../global';

const styles = {
  container: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 7, marginRight: 7,
  },
  searchResult: {
    backgroundColor: Theme.BackgroundColorContent,
    borderRadius: 7,
    elevation: 3,
    flexDirection: 'row',
    fontSize: Theme.FontSize,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1, marginBottom: 1,
  },
  searchResultPadding: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResultView: {
    flex: 1,
  },
  searchResultText: {
    fontSize: 0.7 * Theme.FontSize,
    paddingTop: 0.7 * Theme.FontSize,
    paddingBottom: 0.7 * Theme.FontSize,
    paddingLeft: 5, paddingRight: 5,
  },
}

class MapSearchResults extends Component {
  state = {
    results: [],
  }

  render() {
    return (
      <View pointerEvents='box-none' style={styles.container}>
        {this.state.results.map(result => {
          return (

            <TouchableOpacity key={result.id} style={styles.searchResult}
              accessibilityLabel={result.description}
              onPress={() => {

                Keyboard.dismiss();

                this.props.thisRef.goToRegion(
                  parseFloat(result.coords.lat), parseFloat(result.coords.lng));

              }}>
              <View style={styles.searchResultPadding}></View>
              <View style={styles.searchResultView}>
                <Text numberOfLines={1} style={styles.searchResultText}>
                  {result.description}
                </Text>
              </View>
              <View style={styles.searchResultPadding}></View>
            </TouchableOpacity>

          )
        })}
      </View>
    )
  }
}

export default MapSearchResults;
