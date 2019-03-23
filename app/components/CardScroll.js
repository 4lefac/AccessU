/*
** A CardScroll is a ScrollView containing the map's card elements.
**
** Properties:
**
** snapToInterval - inherited from ScrollView.
*/



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
  CardEntrance,
  CardTitle,
  IconText,
} from './';
import { Circle } from 'react-native-maps';
import Theme from '../styles/Theme';

const styles = {
  cardTitleTag: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 10
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
    borderRadius: 6,
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
  ** the CardScroll based on an inputed state.
  */
  setupLocation = (state) => {
    // set state
    this.setState(state, () => {

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
      style={[this.props.style]}
      ref={ref => { this.scrollView = ref }}
      >

        {/* TITLE CARD */}

        <Card
        height={this.props.cardHeight}
        width={this.props.cardWidth}
        margin={this.props.cardMargin}
        style={{ marginBottom: 40 }}
        imageUri={this.state.cardTitleImageUri}
        title={this.state.cardTitleTitle}
        ref={ref => { this.cardTitle = ref }}
        >
          <Text style={{ fontWeight: 'bold' }}>
          {this.state.cardTitleNumEntrances} accessible entrances
          </Text>
          <Text>{this.state.cardTitleDesc}</Text>

          <View style={styles.cardTitleTag}>
            <Text style={{ fontSize: 12 }}>Swipe to view entrances</Text>
          </View>
        </Card>

        {/* ENTRANCE CARD(S) */}

        {this.state.cardEntrances.map(entrance => { return (
        <Card
        key={entrance.id}
        height={this.props.cardHeight}
        width={this.props.cardWidth}
        margin={this.props.cardMargin}
        imageUri={entrance.imageUri}
        title={entrance.direction.toUpperCase() + ' entrance'}
        style={{ marginBottom: 40}}
        >
          <Text>{entrance.keywords}</Text>
          <View style={styles.entranceContainer}>
            <View style={styles.entranceContent}>

              <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Route')
              }}>
                <IconText icon='map-signs' size={-1}
                style={styles.entranceIcon}>Get Directions</IconText>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('MarkerInfo', {
                  imageUri: entrance.imageUri,
                })
              }}>
                <IconText icon='question-circle-o' size={-1}
                style={styles.entranceIcon}>More Info</IconText>
              </TouchableOpacity>

            </View>
          </View>
        </Card>
        )})}

      </Animated.ScrollView>
    );
  }

}

export default CardScroll;
