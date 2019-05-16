import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import SignUpButton from "../components/SignUpButton";
import FormTextInput from "../components/FormTextInput";
import { Auth } from "../api/Auth";
class SignUp extends Component {
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    };

    handleEmailChange = (email) => {
        this.setState({ email: email });
    };

    handleFirstNameChange = (firstName) => {
        this.setState({ firstName: firstName });
    };

    handleLastNameChange = (lastName) => {
        this.setState({ lastName: lastName });
    };

    handlePasswordChange = (password) => {
        this.setState({ password: password });
    };
    handleSignUpPress = () => {
        alert("You have successfully logged in but for now just use default account to log in");
        Auth.SignUp(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.password)
        this.props.navigation.goBack();
    }
    handleCancelpress = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.registration}>Registration</Text>
                <View style={styles.form}>
                    <FormTextInput
                        value={this.state.firstName}
                        onChangeText={this.handleFirstNameChange}
                        placeholder='First Name'
                    />
                    <FormTextInput
                        value={this.state.lastName}
                        onChangeText={this.handleLastNameChange}
                        placeholder='Last Name'
                    />
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
                    <SignUpButton onPress={this.handleSignUpPress} />
                </View>
                <TouchableOpacity style={styles.cancel} onPress={this.handleCancelpress}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
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
    },
    registration: {
        fontSize: 20,
        color: '#000000',
        position: 'absolute',
        left: 17,
        top: 50,
    },
    form: {
        flex: 2,
        top: 100,
        justifyContent: "center",
        width: "70%",
        height: 10,
        marginBottom: '20%'
    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 50,
    }
});

export default SignUp;