/*
** Section allows all children to be formatted into a unique segment of content.
**
** Properties:
**
** padded   - boolean. If the section is padded. Default is false.
** margin   - boolean. If the section has a margin. Default is false.
** flex     - float in [0, 1]. The amount of space a Section will take in a
**            container between 0 and 1. Default is 0.
** visible  - boolean. Specifies whether background and border will be displayed
**            or not. Default is false.
*/



import React from 'react';
import { View } from 'react-native';
import Theme from '../styles/Theme';

const styles = {
  Section: {
    borderRadius: 6,
    backgroundColor: Theme.BackgroundColorContent,
  }
};



const Section = (props) => {
  let padding = props.padding ? '2%' : 0;
  let margin = props.margin ? '2%' : 0;
  let flex = props.flex ? props.flex : 0;
  return (
    <View style={[props.visible ? styles.Section : {},
    { padding: padding, margin: margin, flex: flex }, props.style]}>
      {props.children}
    </View>
  );
}

export default Section;
