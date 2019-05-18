import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FormTextInput,
  TextButton
} from '../components';
import imageLogo from "../assets/images/logo.jpeg";
import { Auth } from "../api/Auth";

import { Theme } from '../global';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Theme.BackgroundColorContent,
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: '80%',
    resizeMode: 'contain',
  },
  form: {
    flex: 1,
    width: '80%',
    paddingBottom: '5%',
  },
  formInput: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  formInputLabel: {
    height: 0,
  }
}



class LogIn extends Component {
  static navigationOptions = { header: null }

  state = {
    email: '',
    password: ''
  }

  handleEmailChange = email => this.setState({ email });
  handlePasswordChange = password => this.setState({ password });
  handleSignUpPress = () => this.props.navigation.navigate("SignUpScreen");
  handleLogInPress = () => {
    Auth.signIn(this.state.email, this.state.password).then(response => {
      if (response) {
        alert("great job you're signed in, we are working on this feature so we will let you know when we are done");
        this.props.navigation.goBack();
      } else {
        alert("incorrect password or email");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        {/* image */}

        <Image source={imageLogo} style={styles.logo} />

        {/* form */}

        <View style={styles.form}>
          {/* email */}
          <FormTextInput
          style={styles.formInput}
          styleLabel={styles.formInputLabel}
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          placeholder='Email'
          />
          {/* password */}
          <FormTextInput
          style={styles.formInput}
          styleLabel={styles.formInputLabel}
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          placeholder='Password'
          />
          {/* log in */}
          <TextButton text='Log In'
          onPress={this.handleLogInPress}
          />
          {/* sign up */}
          <TextButton text='Sign Up'
          color={Theme.White}
          backgroundColor={Theme.IconColorHighlight}
          onPress={this.handleSignUpPress}
          />
        </View>

      </View>
    );
  }
}

export default LogIn;