import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../global';

const styles = {
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Theme.FontSize / 3,
        borderRadius: 5,
    },
    iconContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        aspectRatio: 1,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        marginLeft: Theme.FontSize / 2,
        fontSize: Theme.FontSize,
    },
}


class SideMenuButton extends Component {

    render() {
        return (
            <TouchableOpacity style={[styles.button,
            this.props.active ? { backgroundColor: 'rgba(255, 255, 255, 0.3)' } : {},
            this.props.style]}
            onPress={this.props.onPress}>
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={this.props.icon} color={Theme.White} size={Theme.FontSize*2} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{this.props.children}</Text>
                </View>

            </TouchableOpacity>
        );
    }
}

export default SideMenuButton;