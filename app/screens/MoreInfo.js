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
}

class MoreInfo extends Component {
    static navigationOptions = (Platform.OS == 'android') ? { header: null } : { headerTitle: 'More Info' };

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

export default MoreInfo;
