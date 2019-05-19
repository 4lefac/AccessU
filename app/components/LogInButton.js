import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

import { Theme } from '../global';

const styles = {
    default: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Theme.IconColorBackground,
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
    },
    text: {
        color: '#000000',
        textAlign: "center",
        height: 20
    }
}

const LoginButton = (props) => {
    return (
        <TouchableOpacity style={styles.default} onPress={props.onPress}>
            <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
    );
}

export default LoginButton;
