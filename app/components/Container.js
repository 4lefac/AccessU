/*
** A Container component simply holds all its children in a properly formatted
** container.
*/



import React, { Component } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Theme from '../styles/Theme';



const styles = EStyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Theme.BackgroundColor,
    paddingTop: '1%',
    paddingBottom: '1%',
  },
  '@media ios': {
    Container: {
      paddingTop: '5%',
    }
  },
});

class Container extends Component {
  render() {
    return (

      <View style={styles.Container}>
        {this.props.children}
      </View>

    );
  }
}

export default Container;
