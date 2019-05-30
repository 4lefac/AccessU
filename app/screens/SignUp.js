import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SignUpButton from "../components/SignUpButton";
import FormTextInput from "../components/FormTextInput";
import { Auth } from "../api/Auth";
import t from "tcomb-form-native";
//ignore this for now.
{
  /* T FORM  */
}

const Form = t.form.Form;

{
  /* email validation */
}
var email = t.refinement(t.String, function(e) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
    return true;
  } else {
    return false;
  }
});

email.getValidationErrorMessage = function(value, path, context) {
  return "Invalid email.";
};

{
  /* password validation */
}
var pass = t.refinement(t.String, function(p) {
  var paswd = /^[0-9a-zA-Z]{8,}$/;
  if (p.match(paswd)) {
    return true;
  } else {
    return false;
  }
});

pass.getValidationErrorMessage = function(value, path, context) {
  if (!value) {
    return "You have to enter a password.";
  } else {
    return "Must be atleast 8 letters or digits and must start with a letter.";
  }
};
class SignUp extends Component {
  static navigationOptions = { header: null };

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  handleEmailChange = email => this.setState({ email });

  handleFirstNameChange = firstName => this.setState({ firstName });

  handleLastNameChange = lastName => this.setState({ lastName });

  handlePasswordChange = password => this.setState({ password });

  handleSignUpPress = () => {
    alert(
      "You have successfully logged in but for now just use default account to log in"
    );
    Auth.SignUp(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password
    );
    this.props.navigation.goBack();
  };
  handleCancelPress = () => this.props.navigation.goBack();

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.registration}>Registration</Text>
        <View style={styles.form}>
          <FormTextInput
            value={this.state.firstName}
            onChangeText={this.handleFirstNameChange}
            placeholder="First Name"
          />
          <FormTextInput
            value={this.state.lastName}
            onChangeText={this.handleLastNameChange}
            placeholder="Last Name"
          />
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            placeholder="Email"
          />
          <FormTextInput
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder="Password"
          />
          <SignUpButton onPress={this.handleSignUpPress} />
        </View>
        <TouchableOpacity
          style={styles.cancel}
          onPress={this.handleCancelPress}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between"
  },
  registration: {
    fontSize: 20,
    color: "#000000",
    position: "absolute",
    left: 17,
    top: 50
  },
  form: {
    flex: 2,
    top: 100,
    justifyContent: "center",
    width: "70%",
    height: 10,
    marginBottom: "20%"
  },
  cancel: {
    position: "absolute",
    right: 20,
    top: 50
  }
});

export default SignUp;
