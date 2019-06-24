import React, { Component } from "react";
import { Text, View, Platform } from "react-native";
import { NAME, Theme, VERSION } from "../global";
import {
  IconButton,
} from '../components';

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
    },
    header: {
        width: '100%',
        height: '20%',
        
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    close: {
        paddingRight: 50,
        color: Theme.Color,
    },
    content: {
      flex: 1,
      width: '100%',
      borderWidth: '5px',
      borderStyle: 'solid',
      borderColor: 'black',
    },
}

class MoreInfo extends Component {
    static navigationOptions = (Platform.OS == 'android') ? { header: null } : { headerTitle: 'More Info' };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>{NAME} version {VERSION}</Text> */}
        <View style={styles.header}>
            <IconButton
                style={styles.close}
                icon='close'
                onPress={() => {
                    this.props.navigation.goBack();
            }} />
        </View>
        <View style={styles.content}>
          <Text>Content goes here.</Text>
        </View>
      </View>
    );
  }
}

export default MoreInfo;
