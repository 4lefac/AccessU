/*
** A CardScroll is a ScrollView containing all card elements.
**
** Properties:
**
** snapToInterval - inherited from ScrollView.
** onScroll       - inherited from ScrollView.
*/



import React, { Component } from 'react';
import {
  ScrollView,
  Animated,
} from 'react-native';
import Theme from '../styles/Theme';



export default class CardScroll extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animated.ScrollView
      horizontal
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={this.props.snapToInterval}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
      onScroll={this.props.onScroll}
      style={[this.props.style]}>
        {this.props.children}
      </Animated.ScrollView>

    );
  }

}
