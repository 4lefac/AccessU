

import EStyleSheet from 'react-native-extended-stylesheet';


export default EStyleSheet.create({
    // sets up the alignment, sizing and background of the screen
    Container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#ddd',
      paddingTop: '1%',
      paddingBottom: '1%',
    },
    // provides a padded white container for content
    Content: {
      width: '100%',
      marginTop: '1%',
      marginBottom: '1%',
      padding: '2%',
      backgroundColor: '#fff',
    },
    // standalone buttons for map screens
    ButtonTouch: {
      flex: 0.2,
      justifyContent: 'center',
      aspectRatio: 1,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 4,
      opacity: 0.9,
      //borderWidth: 3,
      //borderColor: '#ddd',
    },
    ButtonText: {
      color: '#444',
      textAlign: 'center',
    },
    // simple icons used for navigations
    IconButtonTouch: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      aspectRatio: 1,
    },
    IconButtonText: {
      textAlign: 'center',
    },


});
