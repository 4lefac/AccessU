import React, { Component } from 'react';
import {
  Keyboard,
  TextInput
} from 'react-native';
import { Theme } from '../global';

class MapSearchBar extends Component {
  state = {
    text: '',
  }

  render() {
    return (
      <TextInput
      style={[{ fontSize: Theme.FontSize }, this.props.style]}
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
