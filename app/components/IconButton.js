/*
** An IconButton is an icon component that acts as a button.
**
** Properties:
**
** accessibilityLabel - string. The label read by a screen reader.
** icon - string. The name of the icon to be displayed. Required.
** onPress - function. Called on press of button.
*/



import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../styles/Theme';



const styles = {
  IconButtonTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    aspectRatio: 1,
  },
};

class IconButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <TouchableOpacity
      style={[styles.IconButtonTouch, this.props.style]}
      accessibilityLabel={this.props.accessibilityLabel}
      onPress={this.props.onPress}
      >
        <Text>
          <Icon
          name={this.props.icon}
          size={Theme.IconSize}
          style={{textAlign: 'center', color: Theme.Color}}
          />
        </Text>
      </TouchableOpacity>

    );
  }

}

export default IconButton;
