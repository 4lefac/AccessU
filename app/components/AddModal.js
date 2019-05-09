import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  FormTextInput,
  IconButton,
  MapButton,
} from './';
import {
  Theme,
} from '../global';
import { Routes } from '../api/Routes';

const { width, height } = Dimensions.get('window');

const styles = {
  ViewContainer: {
    position: 'absolute',
    left: 0, right: 0,
    height: height,
    zIndex: 5,
    elevation: 7,
  },
  ScrollView: {
    position: 'absolute',
    zIndex: 7,
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    top: 0,
    height: 0.9 * height,
    elevation: 3,
    backgroundColor: Theme.BackgroundColorContent,
  },
  ScrollViewContent: {
    padding: 30,
    paddingLeft: 20, paddingRight: 20,
  },
  ImageContainer: {
    width: width,
    height: 0.4 * height,
    backgroundColor: Theme.BackgroundColor,
  },
  ViewAddImage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewBottomBar: {
    position: 'absolute',
    zIndex: 7,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20, paddingRight: 20,
    height: 0.1 * height,
    bottom: 0,
    elevation: 3,
    backgroundColor: Theme.BackgroundColorContent,
  },
  ViewBottomButton: {
    flex: 0.15,
    aspectRatio: 1,
  },
}

class AddModal extends Component {
  state = {
    top: -1 * height,
    data: null,
    imageUri: '',
  }

  openModal = data => {
    this.setState({
      top: 0,
      data: data,
    });
  }

  closeModal = () => {
    this.setState({ top: -1 * height });
  }

  render() {
    return (
      <View style={[styles.ViewContainer, { top: this.state.top }]}>

        {/* FORM SCROLLVIEW */}

        <ScrollView style={styles.ScrollView}>

          <View style={styles.ImageContainer}>

            {/* image */}

            {this.state.imageUri ? (
              <Image
              style={{ width: '100%', height: '100%' }}
              source={{ uri: this.state.imageUri }}
              />
            ) : (<Text></Text>)}

            <View style={styles.ViewAddImage}>

              <MapButton icon='camera-alt'
              style={{ flex: 0.2, }}
              backgroundColor='rgba(0, 0, 0, 0.5)'
              color={Theme.BackgroundColorContent}
              accessibilityLabel='add image'
              onPress={() => {
                alert('test button');
              }} />

            </View>

          </View>

          <View style={styles.ScrollViewContent}>

          {/* if location, location name */}

          {this.state.data && this.state.data.eType == 'location' ? (
          <FormTextInput
          label='Location Name'
          placeholder='e.g. The Union'
          focusColor={Theme.IconColorHighlight}
          ref={ref => { this.InputLocName = ref; }}
          />
          ) : (<Text></Text>)}

          {/* if location, location description */}

          {this.state.data && this.state.data.eType == 'location' ? (
          <FormTextInput
          label='Location Description'
          placeholder='e.g. a campus library'
          focusColor={Theme.IconColorHighlight}
          ref={ref => { this.InputLocDesc = ref; }}
          />
          ) : (<Text></Text>)}

          {/* if entrance, location name */}

          {this.state.data && this.state.data.eType == 'entrance' ? (
          <Text style={{ fontSize: Theme.FontSize }}>
          Location name:&nbsp;
          <Text style={{ fontWeight: 'bold' }}>
            {this.state.data.location.name}
          </Text></Text>
          ) : (<Text></Text>)}

          {/* if entrance, entrance direction */}

  {/* select*/}

          {/* if entrance, entrance descriptions */}

          {this.state.data && this.state.data.eType == 'entrance' ? (
          <FormTextInput
          label='Entrance Description'
          placeholder='e.g. the side door entrance'
          focusColor={Theme.IconColorHighlight}
          ref={ref => { this.InputEntDesc = ref; }}
          />
          ) : (<Text></Text>)}

          {/* accessibility types */}

{/* multi-select*/}

          </View>

        </ScrollView>

        {/* BOTTOM BAR */}

        <View style={styles.ViewBottomBar}>
          <View style={styles.ViewBottomButton}>
            <IconButton icon='close'
            color={Theme.IconColorBackground}
            accessibilityLabel='close and return to the add selection screen'
            onPress={() => this.closeModal()} />
          </View>

          <View style={styles.ViewBottomButton}>
            <IconButton icon='check'
            color={Theme.IconColorHighlight}
            accessibilityLabel='close and return to main map'
            onPress={() => {
              // location POST
              if (this.state.data.eType == 'location') {
/*
                alert(JSON.stringify(
                  // this.InputLocName.val()
                  this.state.data.coordinates.latitude
                ));
*/
//todo provide form validation check

                Routes.POST_Add({
                  name: this.InputLocName.val(),
                  description: this.InputLocDesc.val(),
                  coordinates: {
                    _latitude: this.state.data.coordinates.latitude,
                    _longitude: this.state.data.coordinates.longitude,
                  },
                  imageUri: this.state.imageUri,
                  keywords: [],
                  entrances: [],
                  // id: '',
                });
  
              }
              // entrance POST
              else {
                alert('POST entrance');

              }
              // close modal
              this.closeModal();
              this.props.thisRef.closePanels();
            }} />
          </View>

        </View>

      </View>
    )
  }
}

export default AddModal;
