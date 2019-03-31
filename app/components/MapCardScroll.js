import React, { Component } from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Card,
  IconButton,
  IconTextButton,
} from './';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../global';

const styles = {
  card: { marginBottom: 60 },
  cardTitleTag: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 10,
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
  entranceIcon: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Theme.Color,
  }
}

class CardScroll extends Component {
  state = {
    cardTitleImageUri: 'placeholder.jpg',
    cardTitleTitle: 'location',
    cardTitleNumEntrances: 1,
    cardTitleDesc: 'location description',
    cardEntrances: [],
  }

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
      });
    });

  }

  render() {
    return (
      <Animated.ScrollView horizontal scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={this.props.snapToInterval}
      snapToAlignment='center'
      decelerationRate={0.75}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
      onScroll={Animated.event(
      [{nativeEvent: { contentOffset: {
        x: this.animation,
      }}}], { useNativeDriver: true }
      )}
      style={this.props.style}
      ref={ref => { this.scrollView = ref }}
      >

        {/* TITLE CARD */}

        <Card style={styles.card}
        height={this.props.cardHeight}
        width={this.props.cardWidth}
        margin={this.props.cardMargin}
        imageUri={this.state.cardTitleImageUri}
        title={this.state.cardTitleTitle}
        ref={ref => { this.cardTitle = ref }}>
          <Text style={{ fontWeight: 'bold' }}>
          {this.state.cardTitleNumEntrances} accessible entrances</Text>
          <Text>{this.state.cardTitleDesc}</Text>
          <Text>Rating: (add rating here)</Text>
          <View style={styles.cardTitleTag}>
            <Text style={{ fontSize: 12 }}>Swipe right to view entrances</Text>
          </View>
        </Card>

        {/* ENTRANCE CARD(S) */}

        {this.state.cardEntrances.map(entrance => { return (
        <Card key={entrance.id}
        height={this.props.cardHeight}
        width={this.props.cardWidth}
        margin={this.props.cardMargin}
        imageUri={entrance.imageUri}
        title={entrance.direction.toUpperCase() + ' entrance'}
        style={styles.card}>
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
              backgroundColor={Theme.IconColorBackground}
              accessibilityLabel='get directions'
              onPress={() => {
                alert('directions');
              }}>Get directions</IconTextButton>

              <IconButton icon='directions'
              color={Theme.IconColorHighlight}
              accessibilityLabel='open in Google Maps'
              onPress={() => {
                alert('google maps');
              }} />

              <IconTextButton icon='info'
              fill={true}
              backgroundColor={Theme.BackgroundColor}
              color={Theme.Color}
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

export default CardScroll;