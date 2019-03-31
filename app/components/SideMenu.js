import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Menu } from './';
import { Theme } from '../global';

const styles = {
  ViewContainer: {
    flex: 1,
    backgroundColor: Theme.BackgroundColorContent,
    padding: 10,
  },
}

class SideMenu extends Component {
  state = {
  }

  open = () => this.Menu.open();

  render() {
    return (
      <Menu
      height={this.props.height}
      width={this.props.width}
      size={this.props.size}
      ref={ref => { this.Menu = ref }}>
        <View style={styles.ViewContainer}>
        {this.props.userInfo ? (
          <Text>All logged in!</Text>
        ) : (
          <Text>Sorry, gotta log in.</Text>
        )}
        </View>
      </Menu>
    )
  }
}

export default SideMenu;
