/*
** An IconText is a component consisting of an icon-text pair.
**
** Properties:
**
** icon - string. The name of the icon to be displayed. Required.
*/



import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../styles/Theme';



class IconText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Icon name={this.props.icon} size={Theme.IconSize} />
        <Text style={{marginLeft: 10}}>{this.props.children}</Text>
      </View>

    );
  }

}

export default IconText;
