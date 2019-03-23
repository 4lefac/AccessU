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



import React from 'react';
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
    elevation: 1,
  }
};



const MapButton = (props) => {
  return (
    <TouchableOpacity
    style={[styles.Button, props.style]}
    accessibilityLabel={props.accessibilityLabel}
    onPress={props.onPress}>
      <Icon name={props.icon} size={Theme.IconSize + 15}
      style={[{ textAlign: 'center' }, props.iconStyle]} />
    </TouchableOpacity>
  );
}

export default MapButton;
