import React, { Component } from "react";
import { Text, View, Platform } from "react-native";
import { NAME, Theme, VERSION } from "../global";

const styles = {
  container: {
    flex: 1,
    backgroundColor: Theme.White,
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: Theme.FontSize + 10,
    fontWeight: "bold",
    color: Theme.Black,
    padding: Theme.FontSize
  }
};

//If android do not show header
const result =
  Platform.OS == "android"
    ? {
        header: null
      }
    : {
        headerTitle: "About"
      };

class About extends Component {
  static navigationOptions = result;

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {NAME} version {VERSION}
        </Text>
      </View>
    );
  }
}

export default About;
