/*
** An IconText is a component consisting of an icon-text pair.
**
** Properties:
**
** icon - string. The name of the icon to be displayed. Required.
** size - {-2, -1, 0, 1, 2}. The size of the icon. Default is 0.
*/



import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../styles/Theme';



const IconText = (props) => {
  let iconSize = props.size ? (Theme.IconSize+10*props.size) : Theme.IconSize;
  return (
    <View style={[{ alignItems: 'center', flexDirection: 'row' }, props.style]}>
      <Icon name={props.icon} size={iconSize} />
      <Text style={{ marginLeft: 10 }}>{props.children}</Text>
    </View>
  );
}

export default IconText;
