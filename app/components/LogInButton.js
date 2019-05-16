import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Theme } from '../global';

const LoginButton = (props) => {
    return (
        <TouchableOpacity style={styles.default} onPress={props.onPress}>
            <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    default: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Theme.IconColorBackground,
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.7)"
    },
    text: {
        color: '#000000',
        textAlign: "center",
        height: 20
    }
});

export default LoginButton;