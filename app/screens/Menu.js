import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
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
});

export default class Menu extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = { header: null };

  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>Hey, this is test text for the menu. More content coming soon.</Text>
        </View>
      </View>
    );
  }

}
