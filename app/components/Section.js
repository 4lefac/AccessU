/*
** Section allows all children to be formatted into a unique segment of content.
**
** Properties:
**
** backgroundColor - string. Custom background color. Default is theme color.
*/



import React, { Component } from 'react';
import { View } from 'react-native';
import Theme from '../styles/Theme';



const styles = {
  Section: {
    width: '95%',
    marginTop: '1%',
    marginBottom: '1%',
    padding: '2%',
    borderRadius: 2,
  }
};

class Section extends Component {
  constructor(props) {
    super(props);

    this.bgColor = this.props.backgroundColor || Theme.BackgroundColorContent;

  }

  render() {
    return (

      <View style={[styles.Section, {backgroundColor: this.bgColor}]}>
        {this.props.children}
      </View>

    );
  }

}

export default Section;
