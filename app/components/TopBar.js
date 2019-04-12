import React, { Component } from 'react';
import {
  Keyboard,
  View,
} from 'react-native';
import {
  IconButton,
  MapSearchBar,
} from './';
import { Theme } from '../global';

const styles = {
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Theme.BackgroundColorContent,
    height: '100%',
    width: '100%',
    marginLeft: 7, marginRight: 7,
    borderRadius: 7,
    elevation: 3,
  },
  menuButton: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  }
}

class TopBar extends Component {
  state = {
  }

  render() {
    return (
      <View style={styles.container}>

        {/* MENU */}

        <View style={styles.menuButton}>
          <IconButton
          icon={ this.props.userInfo ? 'dehaze' : 'account-circle' }
          accessibilityLabel='menu'
          onPress={() => { if (this.props.userInfo) {
            Keyboard.dismiss();
            this.props.thisRef.SideMenu.open();
          } else {
            alert('log in');
          }}} />
        </View>

        {/* SEARCH BAR */}

        <View style={{ flex: 1 }}>
          <MapSearchBar thisRef={this} />
        </View>

        {/* SETTINGS */}

        <View style={styles.menuButton}>
          <IconButton icon='settings'
          accessibilityLabel='settings'
          onPress={() => {
            alert('settings');
          }} />
        </View>

      </View>
    );
  }
}

export default TopBar;
