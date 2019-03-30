import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../global';

const styles = {
  IconButtonTouchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    aspectRatio: 1,
  },
  IconButtonIcon: {
    textAlign: 'center',
    color: Theme.IconColor,
  }
};

const IconButton = (props) => {
  let iconColor = props.color ? props.color : Theme.Color;
  return (
    <TouchableOpacity
    style={[styles.IconButtonTouchableOpacity, props.style]}
    accessibilityLabel={props.accessibilityLabel}
    onPress={props.onPress}>
      <Icon name={props.icon}
      size={props.size ? props.size : Theme.IconSize}
      style={[styles.IconButtonIcon, props.iconStyle, { color: iconColor }]} />
    </TouchableOpacity>
  )
}

export default IconButton;
