/*
** A RadioButton is a checkbox that consists of two states: an "enabled" or
** "on" state and a "disabled" or "off" state.
**
** Properties:
**
** defaultState       - boolean. Determines the starting state. Default is 0.
** offColor           - string. The color of the icon when in the "off" state.
** onColor            - string. The color of the icon when in the "on" state.
** offIcon            - string. The name of the icon to display in the "off" state.
** onIcon             - string. The name of the icon to display in the "on" state.
** onToggle(state)    - function. Called on state change and passes new state as a parameter.
** accessibilityLabel - string. The label read by a screen reader on press.
*/



import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../styles/Theme';
import {announceForAccessibility} from 'react-native-accessibility';



class RadioButton extends Component {
  constructor(props) {
    super(props);

    // defaults
    this.currentState = this.props.defaultState || 0,
    this.offColor = this.props.offColor || Theme.IconColor;
    this.onColor = this.props.onColor || Theme.IconColorHighlight;
    this.offIcon = this.props.offIcon || 'circle-thin';
    this.onIcon = this.props.onIcon || 'check-circle';

    // call onToggle() based on defaut state
    //this.props.onToggle(this.currentState);

    // set icon
    this.state = {
      icon: this.currentState ? this.onIcon : this.offIcon,
      iconColor: this.currentState ? this.onColor : this.offColor,
    };

  }

  toggle = () => {

    /* set state */
    if (this.currentState) { // turn off
      this.currentState = 0;
      this.setState({
        icon: this.offIcon,
        iconColor: this.offColor,
      });
    }
    else { // turn on
      this.currentState = 1;
      this.setState({
        icon: this.onIcon,
        iconColor: this.onColor,
      });
    }

    /* screen reader */
    let status = this.currentState ? 'enabled' : 'disabled';
    announceForAccessibility(this.props.accessibilityLabel + '  ' + status);

    /* call onToggle prop function */
    this.props.onToggle(this.currentState);

  };


  render() {
    return (

      <View>
        <TouchableOpacity
        accessibilityLabel={this.props.accessibilityLabel}
        style={[{flexDirection: 'row', alignItems: 'center'}, this.props.style]}
        onPress={this.toggle}
        >
          <Icon style={{color: this.state.iconColor}} size={Theme.IconSize-10} name={this.state.icon} />
          <View style={{marginLeft: 10}}>{this.props.children}</View>
        </TouchableOpacity>
      </View>

    );
  }

}

export default RadioButton;
