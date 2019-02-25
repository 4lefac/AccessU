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
/*
      <Circle
      center = {{
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      }}
      fillColor="#000"
      strokeColor="rgba(0,0,0,0)"
      radius={50}
      >

        <Icon name={this.props.icon} size={Theme.IconSize-5} color={Theme.IconColorHighlight} />

      </Circle>
*/
      <Marker
      identifier={this.props.id}
      accessibilityLabel={this.props.accessibilityLabel}
      coordinate = {{
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      }}
      tracksViewChanges={false}
      >

        <Icon name={this.props.icon} size={Theme.IconSize+5} color={Theme.IconColorHighlight} />

        <Callout
        tooltip={true}
        onPress={this.props.onPressCallout}
        >

          <View style={[{flex: 1}]}>
            <View style={[{height: 50, width: 50, backgroundColor: Theme.IconColorHighlight}]}>
              <Text>Go to this place!</Text>
            </View>
          </View>

        </Callout>

      </Marker>

    );
  }

}

export default MapMarker;
