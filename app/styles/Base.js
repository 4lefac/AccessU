

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
    '@media ios': {
      Container: {
        paddingTop: '5%',
      }
    },

    // provides a padded white container for content
    Content: {
      width: '95%',
      marginTop: '1%',
      marginBottom: '1%',
      padding: '2%',
      backgroundColor: '#fff',
      borderRadius: 2,
    },

    // Useful container for vertical-column content
    ColumnContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#ddd',
      paddingTop: '1%',
      paddingBottom: '1%',
    },
    ColumnContent: {
      flex: 1,
      alignItems: 'center'
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
    },
    ButtonText: {
      textAlign: 'center',
    },
    ButtonSize: 30,

    // simple icons used for navigations
    IconButtonTouch: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      aspectRatio: 1,
    },
    IconButtonText: {
      color: '#777',
      textAlign: 'center',
    },
    IconButtonSize: 30,

});
