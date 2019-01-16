import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {announceForAccessibility} from 'react-native-accessibility';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#ddd',
  },
  searchbar: {
    margin: 5,
    width: '90%',
    borderRadius: 4,
    backgroundColor: 'white',
  }
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
        <TextInput
          style={styles.searchbar}
          placeholder="Search"
          autoFocus={true}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          onSubmitEditing={() => {alert(this.state.text)}}
        />
      </View>
    );
  }

}
