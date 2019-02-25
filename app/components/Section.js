/*
** Section allows all children to be formatted into a unique segment of content.
**
** Properties:
**
** padded   - boolean. If the section is padded. Default is false.
** margin   - boolean. If the section has a margin. Default is false.
** flex     - float in [0, 1]. The amount of space a Section will take in a
**            container between 0 and 1. Default is 1.
** visible  - boolean. Specifies whether background and border will be displayed
**            or not. Default is false.
*/



import React, { Component } from 'react';
import { View } from 'react-native';
import Theme from '../styles/Theme';



const styles = {
  Section: {
    borderRadius: 6,
    backgroundColor: Theme.BackgroundColorContent,
  }
};

class Section extends Component {
  constructor(props) {
    super(props);

    this.padding = this.props.padding ? '2%' : 0;
    this.margin = this.props.margin ? '2%' : 0;
    this.flex = this.props.flex ? this.props.flex : 1;
  }

  render() {
    return (

      <View style={[
      this.props.visible ? styles.Section : {},
      { padding: this.padding, margin: this.margin, flex: this.flex },
      this.props.style
      ]}>
        {this.props.children}
      </View>

    );
  }

}

export default Section;
