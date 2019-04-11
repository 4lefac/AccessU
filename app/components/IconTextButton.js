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
  let bgColor = props.backgroundColor ? props.backgroundColor :
  Theme.BackgroundColorContent;
  return (
    <TouchableOpacity
    style={[styles.IconButtonTouchableOpacity, props.style,
    props.fill ? { backgroundColor: props.color } : {
    borderWidth: 1, borderColor: props.color, borderStyle: 'solid' }]}
    accessibilityLabel={props.accessibilityLabel}
    onPress={props.onPress}>

      <Icon name={props.icon} size={Theme.IconSize}
      style={[styles.IconButtonIcon, props.iconStyle,
      { color: props.fill ? bgColor : props.color }]} />

      <Text style={{ color: props.fill ? bgColor : props.color }}>
      {props.children}</Text>

    </TouchableOpacity>
  )
}

export default IconTextButton;
