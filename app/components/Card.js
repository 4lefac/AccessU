import React, { Component } from 'react';
import Header from './Header';
import { View, Image } from 'react-native';
import { Theme } from '../global';

const styles = {
  Card: {
    elevation: 1,
    borderRadius: 8,
    backgroundColor: Theme.BackgroundColorContent,
    overflow: 'hidden',
  }
};

class Card extends Component {
  state = {
    imageUri: this.props.imageUri,
    title: this.props.title,
  }

  setProps = (obj) => {
    this.setState(obj);
  }

  render() {
    return (
      <View style={[styles.Card, { height: this.props.height,
      width: this.props.width, margin: this.props.margin },
      this.props.style]}>

        <Image source={{ uri: this.state.imageUri }}
        style={{ height: this.props.height * 0.5, width: this.props.width }}/>

        <View style={{ padding: 5, paddingTop: 0, flex: 1 }}>
          <Header size={2} marginTopBottom={2}>{this.state.title}</Header>
          {this.props.children}
        </View>

      </View>
    )
  }
}

export default Card;
