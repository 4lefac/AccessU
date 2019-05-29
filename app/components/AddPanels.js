import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  Text,
  View
} from 'react-native';
import { AddModal, IconTextButton, MapButton } from './';
import { Animate, Theme } from '../global';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const styles = {
  ViewContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0
  },
  AnimatedViewPanel: {
    position: 'absolute',
    zIndex: 3,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  TopPanel: {
    height: 0.15 * height,
    backgroundColor: Theme.BackgroundColorContent,
    paddingTop: StatusBar.currentHeight,
    elevation: 5
  },
  BottomPanel: {
    height: 0.25 * height
  },
  TopPanelView: {
    padding: 15
  },
  BottomPanelView: {
    flex: 0.15,
    aspectRatio: 1,
    padding: 10
  },
  BottomPanelAddEntrance: {
    flex: 0.7,
    justifyContent: 'center'
  },
  BottomPanelAddEntranceChild: {
    backgroundColor: Theme.BackgroundColorContent,
    padding: 10
  },
  ViewAddPin: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

class AddPanels extends Component {
  state = {
    topPanelPos: new Animated.Value(-1 * height),
    bottomPanelPos: new Animated.Value(-1 * height),
    bIsOpen: false,

    eType: 'location',
    location: null
  }

  openPanels = () => {
    // close card scroll
    this
      .props
      .thisRef
      .toggleCardScroll(0);

    this
      .props
      .thisRef
      .toggleBars(0);
    Animate(this.state.topPanelPos, 0);
    Animate(this.state.bottomPanelPos, 0);
    this.setState({ bIsOpen: true });
  }

  closePanels = () => {
    this
      .props
      .thisRef
      .toggleBars(1);
    Animate(this.state.topPanelPos, -1 * height);
    Animate(this.state.bottomPanelPos, -1 * height);
    this.setState({ bIsOpen: false, eType: 'location', location: null });
  }

  render() {
    return (
      <View pointerEvents='box-none' style={styles.ViewContainer}>

        {/* TOP BAR */}

        <Animated.View
          style={[
            styles.AnimatedViewPanel,
            styles.TopPanel, {
              top: this.state.topPanelPos
            }
          ]}>

          <View style={styles.TopPanelView}>
            <IconTextButton
              icon='add-location'
              fill={this.state.eType == 'location'
                ? true
                : false}
              color={Theme.IconColorHighlight}
              backgroundColor={null}
              accessibilityLabel='switch to add location'
              onPress={() => {
                if (this.state.eType != 'location')
                  this.setState({ eType: 'location' })
              }}>Add location</IconTextButton>
          </View>

          <Text style={styles.TopPanelView}>or</Text>

          <View style={styles.TopPanelView}>
            <IconTextButton
              icon='adjust'
              fill={this.state.eType == 'entrance'
                ? true
                : false}
              color={Theme.IconColorHighlight}
              bacgroundColor={Theme.IconColorHighlight}
              accessibilityLabel='switch to add entrance'
              onPress={() => {
                if (this.state.eType != 'entrance')
                  this.setState({ eType: 'entrance' })
              }}>Add entrance</IconTextButton>
          </View>

        </Animated.View>

        {/* BOTTOM BAR */}

        <Animated.View
          pointerEvents='box-none'
          style={[
            styles.AnimatedViewPanel,
            styles.BottomPanel, {
              bottom: this.state.bottomPanelPos
            }
          ]}>

          <View style={styles.BottomPanelView}>
            <MapButton
              icon='close'
              backgroundColor={Theme.IconColorBackground}
              color={Theme.BackgroundColorContent}
              accessibilityLabel='close and return to main map'
              onPress={() => this.closePanels()} />
          </View>

          {
            this.state.eType == 'entrance' && this.state.location == null
              ? (
                <View style={[styles.BottomPanelView, styles.BottomPanelAddEntrance]}>
                  <View style={styles.BottomPanelAddEntranceChild}>
                    <Text>
                      Tap on an existing location on the map to add the entrance to it.
                                        </Text>
                  </View>
                </View>
              )
              : (
                <View style={styles.BottomPanelView}>
                  <MapButton
                    icon='check'
                    accessibilityLabel='proceed with location or entrance'
                    color={Theme.IconColorHighlight}
                    onPress={() => {
                      this
                        .props
                        .thisRef
                        .MapView
                        .coordinateForPoint({
                          x: width / 2,
                          y: (Platform.OS == 'android')
                            ? height / 2 - StatusBar.currentHeight
                            : height / 2
                        })
                        .then(result => {
                          if (this.state.eType == 'location') {
                            this
                              .AddModal
                              .openModal({ eType: 'location', coordinates: result });
                          } else {
                            this
                              .AddModal
                              .openModal(
                                { eType: 'entrance', coordinates: result, location: this.state.location }
                              );
                          }
                        })
                    }} />
                </View>
              )
          }

        </Animated.View>

        {/* PIN ICON */}

        {
          this.state.bIsOpen
            ? (
              <View pointerEvents='none' style={styles.ViewAddPin}>
                <Icon
                  name={this.state.eType == 'location'
                    ? 'add-location'
                    : 'adjust'}
                  size={Theme.IconSize + 10}
                  color={Theme.IconColorHighlight2} />
              </View>
            )
            : (<View></View>)
        }

        {/* ADD MODAL */}

        <AddModal
          thisRef={this}
          ref={ref => {
            this.AddModal = ref
          }} />

      </View>
    )
  }
}

export default AddPanels;
