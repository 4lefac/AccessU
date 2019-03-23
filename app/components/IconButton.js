/*
** An IconButton is an icon component that acts as a button.
**
** Properties:
**
** accessibilityLabel - string. The label read by a screen reader.
** icon - string. The name of the icon to be displayed. Required.
** onPress - function. Called on press of button.
*/



import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../styles/Theme';

const styles = {
  IconButtonTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    aspectRatio: 1,
  },
};



const IconButton = (props) => {
  return (
    <TouchableOpacity
    style={[styles.IconButtonTouch, props.style]}
    accessibilityLabel={props.accessibilityLabel}
    onPress={props.onPress}>
      <Text>
        <Icon name={props.icon} size={Theme.IconSize}
        style={[{ textAlign: 'center', color: Theme.Color }, props.iconStyle]} />
      </Text>
    </TouchableOpacity>
  );
}

export default IconButton;
