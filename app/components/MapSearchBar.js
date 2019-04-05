import React, { Component } from 'react';
import {
  Keyboard,
  Platform,
  TextInput
} from 'react-native';
import { Theme } from '../global';

const styles = {
  TextInput: {
    fontSize: Theme.FontSize,
    marginTop: Platform.OS === 'ios' ? 13 : 0,
  },
}

class MapSearchBar extends Component {
  state = {
    text: '',
  }

  render() {
    return (
      <TextInput
      style={[styles.TextInput, this.props.style]}
      placeholder='Search'
      onChangeText={(text) => {
        this.setState({ text });
      }}
      onSubmitEditing={() => Keyboard.dismiss()}
      value={this.state.text}
      ref={this.props._ref}
      />
    )
  }

}

export default MapSearchBar;
