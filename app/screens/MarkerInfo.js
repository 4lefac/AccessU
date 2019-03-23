import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import {
  Container,
  Section,
  IconButton
} from '../components';
//import Theme from '../styles/Theme';
import { announceForAccessibility } from 'react-native-accessibility';



const MarkerInfo = (props) => {
  let { height, width } = Dimensions.get('window');
  let data = {
    imageUri: props.navigation.getParam('imageUri', 'defaultImage.jpg'),
  }
  return (
    <ScrollView style={{ flexDirection: 'row', flex: 1 }}>

      <Image source={{ uri: data.imageUri }}
      style={{ height: height * 0.4, width: width }} />
    
      <Section flex={1} visible={true} padding={true} style={{backgroundColor: 'green'}}>
        <Text>Test text 1</Text>
        <Text>Test text 1</Text>
      </Section>

      <Section visible={true} style={{backgroundColor: 'pink'}}>
        <IconButton icon='close'
        accessibilityLabel="Back to map"
        onPress={() => props.navigation.goBack()}
        style={{ padding: 0, backgroundColor: 'powderblue'}}
        />
      </Section>

    </ScrollView>
  );
}

export default MarkerInfo;
