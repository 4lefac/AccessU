import React, { Component } from 'react';
import {
  Animated,
  Linking,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {
  Card,
  IconTextButton,
} from './';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../global';

const styles = {
  ScrollView: {
    marginBottom: StatusBar.currentHeight ?
                  30 + StatusBar.currentHeight : 30,
  },
  cardTitleTag: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 10,
  },
  cardTitleTagText: {
    fontWeight: 'bold',
    fontSize: Theme.fontSize * 1.2,
    color: Theme.IconColorHighlight,
  },
  entranceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  entranceContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
}

class MapCardScroll extends Component {
  state = {
    cardTitleImageUri: 'placeholder.jpg',
    cardTitleTitle: 'location',
    cardTitleNumEntrances: 1,
    cardTitleDesc: 'location description',
    cardEntrances: [],

    rating: [1,1,1,0.5,0],
  }

  /*
  ** Keeps track of which card is on display.
  */
  cardIndex = 0;

  /*
  ** Resets the scroll position back to the start.
  */
  resetScroll = () => {
    this.scrollView.getNode().scrollTo({ x: 0, animated: true });
  }

  /*
  ** Sets the state of each card within
  ** the MapCardScroll based on an inputed state.
  */
  setupLocation = (newState) => {
    // set state
    this.setState(newState, () => {
      // title card
      this.cardTitle.setProps({
        title: this.state.cardTitleTitle,
        imageUri: this.state.cardTitleImageUri,
      })
    })
  }

  handleScroll = (e) => {
    let index = Math.floor(e.nativeEvent.contentOffset.x / this.props.cardWidth);
    if (index != this.cardIndex) {
      this.cardIndex = index;
      this.props.thisRef.MapComponent.MapEntrances.setActiveEntrance(this.cardIndex);
    }
  }

  render() {
    return (
      <Animated.ScrollView horizontal scrollEventThrottle={100}
      showsHorizontalScrollIndicator={false}
      snapToInterval={this.props.snapToInterval}
      snapToAlignment='center'
      decelerationRate={0.75}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
      onScroll={this.handleScroll}
      style={[this.props.style, styles.ScrollView]}
      ref={ref => { this.scrollView = ref }}>

        {/* TITLE CARD */}

        <Card
        height={this.props.cardHeight}
        width={this.props.cardWidth}
        margin={this.props.cardMargin}
        imageUri={this.state.cardTitleImageUri}
        title={this.state.cardTitleTitle}
        ref={ref => { this.cardTitle = ref }}>
          <Text style={{ fontWeight: 'bold' }}>
          {this.state.cardTitleNumEntrances} accessible entrances</Text>
          <Text>{this.state.cardTitleDesc}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: Theme.FontSize * 0.8 }}>Rating: {this.state.rating.map((star, index) => {
            if (star == 1) return (<Icon key={index} name='star' color={Theme.IconColorHighlight} />);
            else if (star == 0.5) return (<Icon key={index} name='star-half' color={Theme.IconColorHighlight} />);
            else return (<Icon key={index} name='star-border' color={Theme.IconColorHighlight} />);
          })}</Text>
          <View style={styles.cardTitleTag}>
            <Text style={styles.cardTitleTagText}>
              Swipe right to view entrances</Text>
          </View>
        </Card>

        {/* ENTRANCE CARD(S) */}

        {this.state.cardEntrances.map(entrance => { return (
        <Card key={entrance.id}
        height={this.props.cardHeight}
        width={this.props.cardWidth}
        margin={this.props.cardMargin}
        imageUri={entrance.imageUri}
        title={entrance.direction.toUpperCase() + ' entrance'}>
          <Text>Accessibility tags: {(() => {
            let str = '';
            for (let i in entrance.accessibilityTypes)
              str = str + entrance.accessibilityTypes[i] + ', ';
            return str.length > 0 ? str.slice(0, -2) : 'N/A';
          })()}</Text>
          <View style={styles.entranceContainer}>
            <View style={styles.entranceContent}>

              <IconTextButton icon='map'
              fill={true}
              color={Theme.IconColorBackground}
              accessibilityLabel='get directions'
              onPress={() => {
                alert('get directions to ' + JSON.stringify(
                  entrance.coordinates
                ));
              }}>Get directions</IconTextButton>

              <IconTextButton icon='directions'
              color={Theme.IconColorHighlight}
              accessibilityLabel='open in Google Maps'
              onPress={() => {
                const scheme = Platform.select({
                  ios: 'maps:0,0?q=',
                  android: 'geo:0,0?q='
                });

                let lat = entrance.coordinates._latitude;
                let lng = entrance.coordinates._longitude;
                const latLng = `${lat},${lng}`;

                const label = this.state.cardTitleTitle + ' '
                + entrance.direction.toUpperCase() + ' entrance';

                const url = Platform.select({
                  ios: `${scheme}${label}@${latLng}`,
                  android: `${scheme}${latLng}(${label})`
                });

                Linking.openURL(url);
              }} />

              <IconTextButton icon='info'
              fill={true}
              color={Theme.BackgroundColor}
              backgroundColor={Theme.Color}
              accessibilityLabel='more info'
              onPress={() => {
                alert('more info');
              }}>More info</IconTextButton>

            </View>
          </View>
        </Card>
        )})}
      </Animated.ScrollView>
    )
  }
}

export default MapCardScroll;
