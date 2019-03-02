/*
** An IconText is a component consisting of an icon-text pair.
**
** Properties:
**
** icon - string. The name of the icon to be displayed. Required.
** size - {-2, -1, 0, 1, 2}. The size of the icon. Default is 0.
*/



import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../styles/Theme';



class IconText extends Component {
  constructor(props) {
    super(props);

    this.iconSize = this.props.size ?
                    (Theme.IconSize + 10 * this.props.size) :
                    Theme.IconSize;

  }

  render() {
    return (

      <View style={[{alignItems: 'center', flexDirection: 'row'}, this.props.style]}>
        <Icon name={this.props.icon} size={this.iconSize} />
        <Text style={{marginLeft: 10}}>{this.props.children}</Text>
      </View>

    );
  }

}

export default IconText;
