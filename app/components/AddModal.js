import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
  Animated,
  Keyboard,
  TextInput,
  UIManager
} from 'react-native';
import { IconButton, MapButton } from './';
import { Theme } from '../global';
import { Routes } from '../api/Routes';
import { User } from '../api/User';
import t from 'tcomb-form-native';
import ImagePicker from 'react-native-image-picker';
const { width, height } = Dimensions.get('window');
const { State: TextInputState } = TextInput;
{
  /* T FORM SETTINGS AND OPTIONS */
}

const Form = t.form.Form;

const Location = t.struct({ Location: t.String, Description: t.String });

const Directions = t.enums.of(
  ['N', 'E', 'S', 'W', 'NE', 'NW', 'SE', 'SW'],
  'Directions'
);

const Entrance = t.struct({
  Direction: Directions,
  accessibilityTypes: t.struct({
    Mobility: t.Boolean,
    Vision: t.Boolean,
    Auditory: t.Boolean
  })
});

var options = {
  fields: {
    Location: {
      error: 'You must provide a location name.',
      label: 'Location Name'
    },
    Description: {
      error: 'You must provide a description.'
    },
    Direction: {
      error: 'You must provide a direction.'
    },
    accessibilityTypes: {
      label: 'Accessibility Types'
    }
  }
};

{
  /* This controlls what is displayed when the user wants to pick an image. */
}
const ImagePickerOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
  mediaType: 'photo',
  //this is the max size of the photo. Smaller sizes = faster upload times
  maxWidth: 500,
  maxHeigh: 500
};


/* STYLES */


const styles = {
  ViewContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height,
    zIndex: 5,
    elevation: 7
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
    backgroundColor: Theme.BackgroundColorContent
  },
  ScrollViewContent: {
    padding: 30,
    paddingLeft: 20,
    paddingRight: 20
  },
  ImageContainer: {
    width: width,
    height: 0.4 * height,
    backgroundColor: Theme.BackgroundColor
  },
  ViewAddImage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ViewBottomBar: {
    position: 'absolute',
    zIndex: 7,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 0.1 * height,
    bottom: 0,
    elevation: 3,
    backgroundColor: Theme.BackgroundColorContent
  },
  ViewBottomButton: {
    flex: 0.15,
    aspectRatio: 1
  }
};
const userID = User.GET_user_id();

class AddModal extends Component {
  state = {
    top: -1 * height,
    data: null,
    imageUri: '',
    imageType: '',
    locationFormValue: null,
    entranceFormValue: null,
    imageNeededError: true,
    shift: new Animated.Value(0)
  };

  openModal = data => {
    this.setState({ top: 0, data: data });
  };

  closeModal = () => {
    this.setState({
      top: -1 * height
    });
  };

  handleLocationAdd = () => {
    const formValue = this.refs.form.getValue();
    Routes.POST_Add_Location({
      name: formValue.Location,
      description: formValue.Description,
      coordinates: {
        latitude: this.state.data.coordinates.latitude,
        longitude: this.state.data.coordinates.longitude
      },
      keywords: [],
      entrances: [],
      addedBy: userID,
      rating: [0, 0, 0, 0, 0]
    })
      .then(response => {
        //converting the photo into data to make an api call
        var data = new FormData();
        data.append('photo', {
          uri: this.state.imageUri,
          name: response.id,
          type: this.state.imageType
        });
        Routes.POST_Add_Location_Image(data, response.id);
      })
      .then(() => {
        // reloads map locations
        this.props.mapRef.getLocations();
        alert('location successfully added');
      })
      .catch(error => {});
  };

  handleEntranceAdd = () => {
    const formValue = this.refs.form.getValue();
    var accessTypes = [];
    if (formValue.accessibilityTypes.Mobility) {
      accessTypes.push('Mobility');
    }
    if (formValue.accessibilityTypes.Vision) {
      accessTypes.push('Vision');
    }
    if (formValue.accessibilityTypes.Auditory) {
      accessTypes.push('Auditory');
    }
    Routes.POST_Add_Entrance({
      direction: formValue.Direction,
      locationID: this.state.data.location.id,
      coordinates: {
        latitude: this.state.data.coordinates.latitude,
        longitude: this.state.data.coordinates.longitude
      },
      accessibilityType: accessTypes,
      addedBy: userID
    })
      .then(response => {
        var data = new FormData();
        data.append('photo', {
          uri: this.state.imageUri,
          name: response.id,
          type: this.state.imageType
        });
        Routes.POST_Add_Entrance_Image(data, response.id);
      })
      .then(() => {
        // reloads map locations
        this.props.mapRef.getLocations();
        alert('entrance successfully added');
      })
      .catch(error => {});
  };

  handleAddImage = () => {
    ImagePicker.showImagePicker(ImagePickerOptions, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        alert('Error: ' + response.error);
      } else {
        // You can also display the image using data: const source = { uri:
        // 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imageUri: response.uri,
          imageType: response.type,
          imageNeededError: false
        });
      }
    });
  };
  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  handleKeyboardDidShow = event => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        Animated.timing(this.state.shift, {
          // added - 50 so I can account for the error message text in description
          toValue: gap - 50,
          duration: 300,
          useNativeDriver: true
        }).start();
      }
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { shift } = this.state;
    return (
      <View
        style={[
          styles.ViewContainer,
          {
            top: this.state.top
          }
        ]}
      >
        {/* FORM SCROLLVIEW */}

        <ScrollView style={styles.ScrollView}>
          {/* FORM Animated view to account for when the keyboard overlaps the form
          link to tutorial : https://codeburst.io/react-native-keyboard-covering-inputs-72a9d3072689
           */}
          <Animated.View
            style={[styles.container, { transform: [{ translateY: shift }] }]}
          >
            <View style={styles.ImageContainer}>
              {/* image */}

              {this.state.imageUri ? (
                <Image
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  source={{
                    uri: this.state.imageUri
                  }}
                />
              ) : (
                <Text />
              )}
              <View style={styles.ViewAddImage}>
                <MapButton
                  icon='camera-alt'
                  style={{
                    flex: 0.2
                  }}
                  backgroundColor='rgba(0, 0, 0, 0.5)'
                  color={Theme.BackgroundColorContent}
                  accessibilityLabel='add image'
                  onPress={() => {
                    var value = this.refs.form.getValue();
                    this.setState({
                      locationFormValue: value,
                      entranceFormValue: value
                    });
                    this.handleAddImage();
                  }}
                />
              </View>
            </View>
            {/* image warning */}
            {this.state.imageNeededError ? (
              <Text
                style={{ color: Theme.alertRedColor, alignContent: 'center' }}
              >
                *Image Needed*
              </Text>
            ) : (
              <Text />
            )}
            <View
              style={[
                styles.ScrollViewContent,
                {
                  padding: 20
                }
              ]}
            >
              {/* if location, show location form */}
              {this.state.data && this.state.data.eType == 'location' ? (
                <Form
                  ref='form'
                  type={Location}
                  options={{
                    fields: {
                      Location: {
                        error: 'You must provide a location name.',
                        label: 'Location Name',
                        returnKeyType: 'next',
                        onSubmitEditing: () => {
                          this.refs.form
                            .getComponent('Description')
                            .refs.input.focus();
                        }
                      },
                      Description: {
                        error: 'You must provide a description.',
                        returnKeyType: 'go',
                        onSubmitEditing: () => {
                          this.handleLocationAdd;
                        }
                      }
                    }
                  }}
                  value={this.state.locationFormValue}
                  onChange={() => {
                    this.refs.form.getValue();
                  }}
                />
              ) : (
                <Text />
              )}

              {/* if entrance show entrance form */}
              {this.state.data && this.state.data.eType == 'entrance' ? (
                <View>
                  <Text
                    style={{
                      fontSize: Theme.FontSize,
                      marginBottom: 25,
                      textDecorationLine: 'underline'
                    }}
                  >
                    Location name:&nbsp;
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textDecorationLine: 'underline'
                      }}
                    >
                      {this.state.data.location.name}
                    </Text>
                  </Text>
                  <Form
                    ref='form'
                    type={Entrance}
                    options={options}
                    value={this.state.entranceFormValue}
                    onChange={() => {
                      this.refs.form.getValue();
                    }}
                  />
                </View>
              ) : (
                <Text />
              )}
            </View>
          </Animated.View>
        </ScrollView>

        {/* BOTTOM BAR */}

        <View style={styles.ViewBottomBar}>
          <View style={styles.ViewBottomButton}>
            <IconButton
              icon='close'
              color={Theme.IconColorBackground}
              accessibilityLabel='close and return to the add selection screen'
              onPress={() => {
                this.setState({
                  imageUri: '',
                  locationFormValue: null,
                  entranceFormValue: null,
                  imageNeededError: true
                });
                this.closeModal();
              }}
            />
          </View>

          <View style={styles.ViewBottomButton}>
            <IconButton
              icon='check'
              color={Theme.IconColorHighlight}
              accessibilityLabel='close and return to main map'
              onPress={() => {
                //shows form error if user hasn't filled it out yet
                var value = this.refs.form.getValue();

                // close modal only if form is correct
                if (this.state.imageUri != '' && value) {
                  // location POST
                  if (this.state.data.eType == 'location') {
                    this.handleLocationAdd();
                  } else {
                    // entrance POST
                    this.handleEntranceAdd();
                  }
                  // alert(
                  //   'Uploading...Do not leave the app or some stuff maye uploading incompletely. Uploading will take a while till you get an alert saying its done. You have to manually refresh the app for now. Loading screen coming soon.'
                  // );
                  this.closeModal();
                  this.props.thisRef.closePanels();
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default AddModal;
