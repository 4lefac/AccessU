/*
** Card allows all children to be formatted into a unique segment of content
** containing iconic features such as a title, icon/image, description, and
** button.
**
** Properties:
**
** imageUri - string. The uri of the image to display.
** title    - string. The title text.
*/



import React, { Component } from 'react';
import Header from './Header';
import { View, Image } from 'react-native';
import Theme from '../styles/Theme';

const styles = {
  Card: {
    elevation: 1,
    borderRadius: 10,
    backgroundColor: Theme.BackgroundColorContent,
    overflow: 'hidden',
  }
};



export default class Card extends Component {

  state = {
    imageUri: this.props.imageUri,
    title: this.props.title,
  }

  setProps = (obj) => {
    this.setState(obj);
  }

  render() {
    return (

      <View style={[styles.Card, {height: this.props.height,
      width: this.props.width, margin: this.props.margin},
      this.props.style]}>

        <Image source={{uri: this.state.imageUri}}
        style={{ height: this.props.height * 0.45, width: this.props.width }}/>

        <View style={{ padding: 5, paddingTop: 0, flex: 1 }}>
          <Header size={2} marginTopBottom={2}>{this.state.title}</Header>
          {this.props.children}
        </View>

      </View>

    );
  }

}
