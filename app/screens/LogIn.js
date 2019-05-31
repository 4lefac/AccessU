import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { IconButton, TextButton } from '../components';
import imageLogo from '../assets/images/logo.jpeg';
import { Auth } from '../api/Auth';
import { User } from '../api/User';
import { Theme } from '../global';
import t from 'tcomb-form-native';

{
  /* T FORM  */
}

const Form = t.form.Form;

{
  /* email validation */
}
var email = t.refinement(t.String, function(e) {
  if (e) {
    return true;
  } else {
    return false;
  }
});

email.getValidationErrorMessage = function(value, path, context) {
  return 'You must enter an email.';
};

{
  /* password validation */
}
var pass = t.refinement(t.String, function(p) {
  if (p) {
    return true;
  } else {
    return false;
  }
});

pass.getValidationErrorMessage = function(value, path, context) {
  if (!value) {
    return 'You must enter a password.';
  } else {
    return 'Must be atleast 8 letters or digits and must start with a letter.';
  }
};

{
  /* t form options and settings */
}
const Log = t.struct({ Email: email, Password: pass });

{
  /* other */
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: Theme.BackgroundColorContent,
    alignItems: 'center'
  },
  cancel: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: '15%',
    paddingLeft: '5%',
    zIndex: 2
  },
  cancelIcon: {
    fontSize: Theme.FontSize * 2
  },
  logo: {
    flex: 1,
    width: '90%',
    resizeMode: 'contain'
  },
  form: {
    flex: 1,
    width: '90%',
    paddingBottom: '5%',
    justifyContent: 'space-between'
  },
  formInputLabel: {
    height: 0
  },
  forgotPassword: {
    fontSize: 15
  }
};

//If android do not show header because ios users like headers
const navigationSettings = navigation =>
  Platform.OS == 'android'
    ? {
        header: null
      }
    : {
        headerTitle: 'Log In',
        headerLeft: (
          <IconButton
            icon='close'
            size={30}
            onPress={() => {
              var userInfo = User.GET_user_info();
              navigation.navigate('Map', { userInfo: userInfo });
            }}
          />
        )
      };
const keyboardVerticalOffset = Platform.OS == 'android' ? 0 : -5;

class LogIn extends Component {
  static navigationOptions = ({ navigation }) => navigationSettings(navigation);

  state = {
    invalidSignIn: false,
    userEmail: '',
    userPass: ''
  };

  handleForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  handleSignUpPress = () => this.props.navigation.navigate('SignUpScreen');

  handleLogInPress = () => {
    const formValue = this.formRef.getValue();

    if (formValue) {
      Auth.signIn(formValue.Email, formValue.Password).then(response => {
        if (response) {
          this.setState({ invalidSignIn: false });
          this.props.navigation.navigate('Map', { userInfo: {} });
        } else {
          this.setState({
            invalidSignIn: true,
            userEmail: formValue.Email,
            userPass: formValue.Password
          });
        }
      });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.container}
      >
        {/* close button if it is android */}
        {Platform.OS == 'android' ? (
          <IconButton
            style={styles.cancel}
            iconStyle={styles.cancelIcon}
            icon='clear'
            onPress={() => {
              var userInfo = User.GET_user_info();
              this.props.navigation.navigate('Map', { userInfo: userInfo });
            }}
          />
        ) : (
          <Text />
        )}
        {/* image */}
        <Image source={imageLogo} style={styles.logo} />
        {/* form */}
        {this.state.invalidSignIn ? (
          <Text style={{ color: '#FF0000' }}>Incorrect password or email.</Text>
        ) : (
          <Text />
        )}
        <View style={styles.form}>
          <Form
            ref={c => {
              this.formRef = c;
            }}
            type={Log}
            //do not create a variable to hold the value of options this because the getComponent method for some reason wont work
            options={{
              fields: {
                Email: {
                  autoCapitalize: 'none',
                  autoCorrect: false,
                  returnKeyType: 'next',
                  keyboardType: 'email-address',
                  onSubmitEditing: () => {
                    this.formRef.getComponent('Password').refs.input.focus();
                  }
                },
                Password: {
                  password: true,
                  secureTextEntry: true,
                  returnKeyType: 'go',
                  onSubmitEditing: () => this.handleLogInPress()
                }
              }
            }}
            value={{
              Email: this.state.userEmail,
              Password: this.state.userPass
            }}
            onChange={() => {
              this.formRef.getValue();
            }}
          />

          <View>
            {/* Log in */}

            <TextButton
              text='Log In'
              onPress={() => {
                Keyboard.dismiss();
                this.handleLogInPress();
              }}
            />

            {/* sign up */}

            <TextButton
              text='Sign Up'
              color={Theme.White}
              backgroundColor={Theme.IconColorHighlight}
              onPress={this.handleSignUpPress}
            />
          </View>
          {/* Forgot Password */}

          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={this.handleForgotPassword}
          >
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LogIn;
