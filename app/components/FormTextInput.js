import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Theme,
} from '../global';

const styles = {
  ViewContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10, paddingBottom: 10,
  },
  Label: {
    top: 10,
    fontSize: Theme.FontSize - 5,
  },
}

class FormTextInput extends Component {
  state = {
    text: '',
    color: Theme.Color,
  }

  val = () => { return this.state.text }

  render() {
    return (
      <View style={[styles.ViewContainer, this.props.style,
      this.props.styleContainer]}>

        {/* LABEL */}

        <Text style={[styles.Label, this.props.styleLabel
        ]}>{this.props.label}</Text>

        {/* TEXT INPUT */}

        <TextInput style={[{
          fontSize: Theme.FontSize,
          borderBottomWidth: 3,
          borderBottomColor: this.state.color,
        }, this.props.styleInput]}
          onBlur={() => this.setState({ color: Theme.Color })}
          onFocus={() => this.setState({ color: this.props.focusColor })}
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText || (text => this.setState({ text }))}
          onSubmitEditing={() => { }}
          value={this.props.value || this.state.text}
        />

      </View>
    )
  }
}

export default FormTextInput;
