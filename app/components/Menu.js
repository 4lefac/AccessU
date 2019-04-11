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
    menuLeftPos: new Animated.Value(-1 * this.props.width),
    menuBGOpacity: new Animated.Value(0),
  }

  scrollEnd = event => {
    let xPos = event.nativeEvent.contentOffset.x;
    if (xPos > this.props.width * this.props.size * 0.4) this.close();
  }

  open = () => {
    this.ScrollView.getNode().scrollTo({ x: 0, y: 0, animated: false });
    Animate(this.state.menuLeftPos, 0, ANIMATE_TIME / 2);
    Animate(this.state.menuBGOpacity, 1, ANIMATE_TIME / 2);
  }

  close = () => {
    Animate(this.state.menuLeftPos, -1 * this.props.width, ANIMATE_TIME / 2);
    Animate(this.state.menuBGOpacity, 0, ANIMATE_TIME / 2);
  }

  render() {
    let color = this.state.menuBGOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']
    });
    return (
      <Animated.View pointerEvents='box-none'
      style={[styles.AnimatedView, { backgroundColor: color }]}>
        <Animated.ScrollView horizontal pointerEvents='box-none'
        scrollEventThrottle={100}
        decelerationRate='fast'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={this.props.width * this.props.size}
        snapToAlignment='center'
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        onScroll={this.scrollEnd}
        onMomentumScrollEnd={this.scrollEnd}
        onScrollEndDrag={this.scrollEnd}
        style={[styles.ScrollView, {
          height: this.props.height,
          width: this.props.width,
          left: this.state.menuLeftPos
        }]}
        ref={ref => { this.ScrollView = ref }}>

          {/* menu view */}

          <View style={{
            height: this.props.height,
            width: this.props.width * this.props.size,
            elevation: 5,
          }}>{this.props.children}</View>

          {/* hidden menu close handler */}

          <TouchableWithoutFeedback onPress={() => this.close()}>
            <View style={{
              height: this.props.height,
              width: this.props.width,
            }}></View>
          </TouchableWithoutFeedback>


        </Animated.ScrollView>
      </Animated.View>
    )
  }
}

export default Menu;
