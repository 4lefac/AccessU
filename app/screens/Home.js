import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>This is the main screen. Sign-in and other details will be added here.</Text>
        <Button
          title="Take me to the map!"
          accessibilityLabel="screenreader should read this but test it to make sure."
          onPress={() => navigate('Map')}
        />
      </View>
    );
  }

}
