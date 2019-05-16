import React, { Component } from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { SideMenu, Menu, IconButton } from '../components';

class Profile extends Component {

    static navigationOptions = {
        headerTitle: 'Profile',
    };
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "space-between"
    }
});

export default Profile;