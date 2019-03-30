import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  Callout,
  Marker,
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../global';

const styles = {
  CalloutView: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

class MapMarker extends Component {
  state = {
  }

  render() {
    return (
      <Marker identifier={this.props.id}
      accessibilityLabel={this.props.accessibilityLabel}
      coordinate = {{
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      }}
      tracksViewChanges={false}
      onPress={this.props.onPress}
      calloutAnchor={{ x: 0.5, y: 1 }}
      stopPropagation={true}
      >
        {/* icon */}
        <Icon name={this.props.icon} size={Theme.IconSize + 10}
        color={Theme.IconColorHighlight} />
        {/* icon highlight */}
        <Callout tooltip={true}>
          <View style={styles.CalloutView}>
            <Icon name={this.props.icon} size={Theme.IconSize + 10}
            color={Theme.IconColorHighlight2} />
          </View>
        </Callout>

      </Marker>
    )
  }
}

export default MapMarker;
