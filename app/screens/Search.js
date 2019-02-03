// TODO - clear input
// TODO - dynamic input

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList} from 'react-native';
import {announceForAccessibility} from 'react-native-accessibility';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  content: {
    width: '95%',
    marginTop: '2%',
    padding: '2%',
    backgroundColor: 'white',
  },
  button: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    aspectRatio: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
  searchbar: {
    flex: 0.8,
    width: '100%',
    borderRadius: 4,
    backgroundColor: 'white',
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
      <View style={styles.container}>
        {/* search bar */}
        <View style={[styles.content, { backgroundColor: 'rgba(0,0,0,0)' }]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>

            <TouchableOpacity
            style={styles.button}
            accessibilityLabel="Filter"
            onPress={() => navigate('Filter')}
            >
              <Text style={styles.buttonText}>
                filter
              </Text>
            </TouchableOpacity>

            <TextInput
            style={styles.searchbar}
            placeholder="Search"
            autoFocus={true}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={() => {alert(this.state.text)}}
            />

            <TouchableOpacity
            style={styles.button}
            accessibilityLabel="Back to map"
            onPress={() => navigate('Home')}
            >
              <Text style={styles.buttonText}>
                close
              </Text>
            </TouchableOpacity>

          </View>
        </View>
        {/* other content */}
        <View style={styles.content}>
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
