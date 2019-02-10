// TODO - clear input
// TODO - dynamic input

import React, {Component} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Base from '../styles/Base';
import {announceForAccessibility} from 'react-native-accessibility';


const styles = EStyleSheet.create({
  searchbar: {
    flex: 1,
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
      <View style={[Base.Container]}>

        <View style={[Base.Content, { backgroundColor: 'rgba(0,0,0,0)', width: '100%' }]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>

            <TouchableOpacity
            style={[Base.IconButtonTouch]}
            accessibilityLabel="Filter search"
            onPress={() => navigate('Filter')}
            >
              <Text style={[Base.IconButtonText]}>
                filter
              </Text>
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

            <TouchableOpacity
            style={[Base.IconButtonTouch]}
            accessibilityLabel="Back to map"
            onPress={() => {navigate('Home')}}
            >
              <Text style={[Base.IconButtonText]}>
                close
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
