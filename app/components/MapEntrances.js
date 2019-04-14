import React, { Component } from 'react';
import {
  Animated,
  View,
} from 'react-native';
import {
  Circle,
} from 'react-native-maps';
import {
  Theme,
} from '../global';

class MapEntrances extends Component {
  state = {
    activeIndex: 0,
    entrances: [],
  }

  setEntrances = entrances => {
    this.setState({ entrances });
  }

  setActiveEntrance = activeIndex => {
    this.setState({ activeIndex });
  }

  render() {
    return (
      <Animated.View>
      {this.state.entrances.map((entrance, index) => {
        const bIsActive = index + 1 == this.state.activeIndex;
        return (
          <Circle key={entrance.id}
          center={{
            latitude:entrance.coordinates._latitude,
            longitude:entrance.coordinates._longitude
          }}
          radius={bIsActive ? 4 : 2}
          strokeColor={bIsActive ? Theme.IconColorBackground :
          Theme.IconColorHighlight} strokeWidth={2}
          fillColor={bIsActive ? Theme.IconColorBackground : Theme.Clear} />
        )
      })}
      </Animated.View>
    )
  }
}

export default MapEntrances;
