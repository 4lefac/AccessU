import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../global';

const styles = {
  IconButtonTouchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 5, paddingBottom: 5,
    flexDirection: 'row',
    borderRadius: 6,
  },
  IconButtonIcon: {
    textAlign: 'center',
  }
}

const IconTextButton = (props) => {
  let textColor = props.fill ?
    Theme.BackgroundColorContent : Theme.Color;
  if (props.color) textColor = props.color;
  return (
    <TouchableOpacity
    style={[styles.IconButtonTouchableOpacity, props.style,
    props.fill ? { backgroundColor: props.backgroundColor } : {}]}
    accessibilityLabel={props.accessibilityLabel}
    onPress={props.onPress}>

      <Icon name={props.icon} size={Theme.IconSize}
      style={[styles.IconButtonIcon, props.iconStyle,
      { color: textColor }]} />

      <Text style={{ color: textColor }}>
      {props.children}</Text>

    </TouchableOpacity>
  )
}

export default IconTextButton;
