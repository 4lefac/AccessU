import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import { Theme } from '../global';

const styles = {
  default: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.IconColorHighlight,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
  },
  text: {
    color: Theme.BackgroundColorContent,
    textAlign: 'center',
    height: 20
  }
}

const SignUpButton = props => {
    return (
        <TouchableOpacity style={styles.default} onPress={props.onPress}>
            <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
    );
}

export default SignUpButton;
