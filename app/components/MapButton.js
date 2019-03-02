/*
** A MapButton is an icon button displayed on the main map screen.
**
** Properties:
**
** accessibilityLabel - string. Label to be read by screen readers.
** onPress            - function. Function to be called on press event.
** icon               - string. Name of icon to display. Required.
** style              - json. Styles for the button.
** styleIcon          - json. Styles for the icon.
*/



import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../styles/Theme';



const styles = {
  Button: {
    flex: 0.2,
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: Theme.BackgroundColorContent,
    padding: 10,
    borderRadius: 4,
    opacity: 0.9,
//    elevation: 1,
  }
};

class MapButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <TouchableOpacity
      style={[styles.Button, this.props.style]}
      accessibilityLabel={this.props.accessibilityLabel}
      onPress={this.props.onPress}
      >
        <Icon
        style={[{textAlign: 'center'}, this.props.iconStyle]}
        name={this.props.icon}
        size={Theme.IconSize + 15}
        />
      </TouchableOpacity>

    );
  }

}

export default MapButton;
