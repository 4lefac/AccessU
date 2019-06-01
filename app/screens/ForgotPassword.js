import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform
} from "react-native";
import { SideMenu, Menu, IconButton } from "../components";
//If android do not show header
const result =
  Platform.OS == "android"
    ? {
        header: null
      }
    : {
        headerTitle: "Forgot Password"
      };
class ForgotPassword extends Component {
  static navigationOptions = result;
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default ForgotPassword;
