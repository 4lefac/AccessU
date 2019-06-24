import React, { Component } from 'react';
import {
  // Text,
  View,
} from 'react-native';
import {
  IconToggleButton,
  Menu,
} from './';
import { Theme } from '../global';

const style = {
  ViewContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.BackgroundColorContent,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  Setting: {
    flex: 0.3,
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
        <View style={style.ViewContainer}>
          
          <IconToggleButton
            style={style.Setting}
            icon='brightness-6'
            label='High Contrast'
            accessibilityLabel='Toggle high contrast'
            onEnabled={() => {
              alert('high contrast on');
            }}
            onDisabled={() => {
              alert('high contrast off');
            }}
          />

        </View>
      </Menu>
    )
  }
}

export default Settings;
