import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import LogInButton from "../components/LogInButton";
import SignUpButton from "../components/SignUpButton";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/logo.jpeg";
import { Auth } from "../api/Auth";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        flex: 1,
        width: "60%",
        resizeMode: "contain",
        alignSelf: "center"
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "70%",
        marginBottom: '5%'
    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 50,
    }
});

class LogIn extends Component {
    static navigationOptions = {
        headerTitle: 'Log In',
    };
    state = {
        email: "",
        password: ""
    };

    handleEmailChange = (email) => {
        this.setState({ email: email });
    };


    handlePasswordChange = (password) => {
        this.setState({ password: password });
    };
    handleSignUpPress = () => {
        this.props.navigation.navigate("SignUpScreen");
    }
    handleLogInPress = () => {
        Auth.signIn(this.state.email, this.state.password).then((response) => {
            if (response) {
                alert("great job your signed in, we are working on this feature so we will let you know when we are done");
                this.props.navigation.goBack()
            } else {
                alert("incorrect password or email");
            }
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <Image source={imageLogo} style={styles.logo} />
                <View style={styles.form}>
                    <FormTextInput
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        placeholder='Email'
                    />
                    <FormTextInput
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                        placeholder='Password'
                    />
                    <LogInButton onPress={this.handleLogInPress} />
                    <SignUpButton onPress={this.handleSignUpPress} />
                </View>
            </View>
        );
    }
}
export default LogIn;