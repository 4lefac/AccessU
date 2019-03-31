import React, { Component } from 'react';
import { View } from 'react-native';
import {
  MapMarker,
} from './';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Theme } from '../global/';

class MapComponent extends Component {
  state = {
  }

  render() {
    return (
      <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      region={this.props.region}
      showsUserLocation={true}
      showsMyLocationButton={false}
      showsPointsOfInterest={false}
      showsCompass={false}
      showsScale={false}
      showsTraffic={false}
      toolbarEnabled={false}
      pitchEnabled={false}
      customMapStyle={Theme.MapStyle}
      onUserLocationChange={this.props.onUserLocationChange}
      onPress={this.props.onPress}
      ref={this.props._ref}>
      {this.props.locations.map(location => { return (
        <MapMarker icon='place'
        key={location.id.toString()}
        id={location.id.toString()}
        accessibilityLabel={location.name}
        latitude={location.coordinates._latitude}
        longitude={location.coordinates._longitude}
        entrances={location.entrances}
        onPress={() => {
          let map = this.props.thisRef;
          // reset scroll position
          map.MapCardScroll.resetScroll();
          // update cards
          map.MapCardScroll.setupLocation({
            cardTitleImageUri: location.imageUri,
            cardTitleTitle: location.name,
            cardTitleNumEntrances: location.entrances.length,
            cardTitleDesc: location.description,
            cardEntrances: location.entrances,
          });
          // toggle card scroll
          map.toggleCardScroll(1);
        }}
        />
      )})}
      </MapView>
    )
  }

}

export default MapComponent;