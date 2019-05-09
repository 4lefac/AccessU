import React, { Component } from 'react';
import {
  Animated,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Animate,
  ANIMATE_TIME,
} from '../global';

const styles = {
  AnimatedView: {
    flex: 1,
    position: 'absolute',
    zIndex: 7,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  ScrollView: {
    flex: 1,
    position: 'absolute',
    zIndex: 7,
    top: 0,
  },
  ScrollViewContentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

}

class Menu extends Component {
  state = {
    menuLRPos: new Animated.Value(-1 * this.props.width),
    menuTBPos: new Animated.Value(-1 * this.props.height),
    menuBGOpacity: new Animated.Value(0),
  }

  scrollEnd = event => {
    let xPos = event.nativeEvent.contentOffset.x;
    let yPos = event.nativeEvent.contentOffset.y;

    if (this.props.from == 'left') {
      if (xPos > this.props.width * this.props.size * 0.4) this.close();
    }
    else if (this.props.from == 'right') {
      if (xPos < this.props.width * this.props.size * 0.4) this.close();
    }
    else if (this.props.from == 'top') {
      if (yPos > this.props.height * this.props.size * 0.4) this.close();
    }
    else {
      if (yPos < this.props.height * this.props.size * 0.4) this.close();
    }
  }

  open = () => {

    if (this.props.from == 'left' || this.props.from == 'top') {
      this.ScrollView.getNode().scrollTo({ x: 0, y: 0, animated: false });
    } else {
      this.ScrollView.getNode().scrollToEnd({ animated: false });
    }

    Animate(this.state.menuLRPos, 0, ANIMATE_TIME / 2);
    Animate(this.state.menuTBPos, 0, ANIMATE_TIME / 2);
    Animate(this.state.menuBGOpacity, 1, ANIMATE_TIME / 2);
  }

  close = () => {
    Animate(this.state.menuLRPos, -1 * this.props.width, ANIMATE_TIME / 2);
    Animate(this.state.menuTBPos, -1 * this.props.height, ANIMATE_TIME / 2);
    Animate(this.state.menuBGOpacity, 0, ANIMATE_TIME / 2);
  }

  MenuView = (
    <View style={
      this.props.from == 'left' || this.props.from == 'right' ? {
        height: this.props.height,
        width: this.props.width * this.props.size,
        elevation: 5,
      } : {
        height: this.props.height * this.props.size,
        width: this.props.width,
        elevation: 5,
      }}>{this.props.children}</View>
  )

  HiddenHandler = (
    <TouchableWithoutFeedback onPress={() => this.close()}>
      <View style={{
        height: this.props.height,
        width: this.props.width,
      }}></View>
    </TouchableWithoutFeedback>
  )

  render() {
    let color = this.state.menuBGOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']
    });
    return (
      <Animated.View pointerEvents='box-none'
      style={[styles.AnimatedView, { backgroundColor: color }]}>
        <Animated.ScrollView
        pointerEvents='box-none'
        horizontal={this.props.from == 'left' || this.props.from == 'right'}
        vertical={this.props.from == 'top' || this.props.from == 'bottom'}
        scrollEventThrottle={100}
        decelerationRate='normal'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={
          (this.props.from == 'left' || this.props.from == 'right') ?
          (this.props.width * this.props.size) :
          (this.props.height * this.props.size)
        }
        snapToAlignment='center'
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        onScroll={this.scrollEnd}
        onMomentumScrollEnd={this.scrollEnd}
        onScrollEndDrag={this.scrollEnd}
        style={[styles.ScrollView, {
          height: this.props.height,
          width: this.props.width,
        }, {
          left: this.props.from == 'left' ? this.state.menuLRPos : null,
          right: this.props.from == 'right' ? this.state.menuLRPos : null,
          top: this.props.from == 'top' ? this.state.menuTBPos : null,
          bottom: this.props.from == 'bottom' ? this.state.menuTBPos : null,
        }]}
        ref={ref => { this.ScrollView = ref }}>

          {this.props.from == 'left' || this.props.from == 'top' ?
          this.MenuView : this.HiddenHandler}

          {this.props.from == 'left' || this.props.from == 'top' ?
          this.HiddenHandler : this.MenuView}

        </Animated.ScrollView>
      </Animated.View>
    )
  }
}

export default Menu;
