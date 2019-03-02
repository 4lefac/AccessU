/*
** A MapMarker component is a custom MapView marker.
**
** Properties:
**
** id                 - string. Marker unique identifier. Required.
** accessibilityLabel - string. Label for screen readers.
** latitude           - float. The marker latitude. Required.
** longitude          - float. The marker longitude. Required.
** icon               - string. The icon to display. Required.
** iconSelected       - string. The icon to display when seleted.
**/



import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import {
  Marker,
  Callout,
  Polygon,
  Circle
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../styles/Theme';




class MapMarker extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Marker
      identifier={this.props.id}
      accessibilityLabel={this.props.accessibilityLabel}
      coordinate = {{
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      }}
      tracksViewChanges={false}
      onPress={this.props.onPress}
      >

        <Icon name={this.props.icon} size={Theme.IconSize+5} color={Theme.IconColorHighlight} />
        {/*
        <Callout
        tooltip={true}
        onPress={this.props.onPressCallout}
        style={{backgroundColor: 'green'}}
        >

          <View style={[{flex: 1, backgroundColor: 'red'}]}>
            <View style={[{height: 100, width: 50, backgroundColor: Theme.IconColorHighlight}]}>
              <Text>Go to this place!</Text>
            </View>
          </View>

        </Callout>
        */}
      </Marker>

    );
  }

}

export default MapMarker;
