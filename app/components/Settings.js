import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  Menu,
} from './';
import { Theme } from '../global';

const styles = {
  ViewContainer: {
    flex: 1,
    backgroundColor: Theme.BackgroundColorContent,
    borderRadius: 10,
    padding: 20,
  },
}

class Settings extends Component {

  open = () => this.Menu.open();

  render() {
    return (
      <Menu
      height={this.props.height}
      width={this.props.width}
      size={this.props.size}
      from='bottom'
      ref={ref => { this.Menu = ref }}>
        <View style={styles.ViewContainer}>
          <Text>Settings will go here.</Text>
        </View>
      </Menu>
    )
  }
}

export default Settings;
