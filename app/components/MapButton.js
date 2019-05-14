/*
** a MapButton is an icon button displayed on the main map screen
*/

import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../global';

const styles = {
  MapButtonTouchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    aspectRatio: 1,
    borderRadius: 50,
    elevation: 3,
  },
  MapButtonIcon: {
    textAlign: 'center',
  }
};



const MapButton = (props) => {
  return (
    <TouchableOpacity style={[styles.MapButtonTouchableOpacity,
    { backgroundColor: props.backgroundColor || Theme.BackgroundColorContent },
    props.style]} accessibilityLabel={props.accessibilityLabel}
      onPress={props.onPress}>
      <Icon name={props.icon} size={Theme.IconSize}
        style={[styles.MapButtonIcon, props.iconStyle, {
          color: props.color ||
            Theme.Color
        }]} />
    </TouchableOpacity>
  );
}

export default MapButton;
