import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

import { Theme } from '../global';

const styles = {
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.IconColorBackground,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
  },
  text: {
    color: Theme.Black,
    fontSize: Theme.FontSize,
  }
}

const TextButton = props => {
  return (
    <TouchableOpacity style={[styles.button,
    props.backgroundColor ? { backgroundColor: props.backgroundColor } : {} ]}
    onPress={props.onPress}>
      <Text style={[styles.text, props.color ? { color: props.color } : {}]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}

export default TextButton;
