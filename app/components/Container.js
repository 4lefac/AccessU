/*
** A Container component simply holds all its children in a properly formatted
** container.
**
** Properties:
**
** grid       - 'row' or 'column'. Specifies how content should be aligned with
**            the grid. Default is column.
** alignment  - 'start', 'center', or 'end'. Specifies how children should be
**            aligned in the container. Requires the grid property.
*/



import React, { Component } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Theme from '../styles/Theme';



const styles = EStyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Theme.BackgroundColor,
//    paddingTop: '1%',
//    paddingBottom: '1%',
  },
  '@media ios': {
    Container: {
      paddingTop: '5%',
    }
  },
});

class Container extends Component {
  constructor(props) {
    super(props);

    this.grid = this.props.grid || 'column';
    this.align;

    if (this.props.grid) {
      switch (this.props.alignment) {
        case 'start': { this.align = 'flex-start'; break; }
        case 'end': { this.align = 'flex-end'; break; }
        case 'center': { this.align = 'center'; break; }
        default: break;
      }
    }

  }

  render() {

    return (

      <View style={[ styles.Container,
      { flexDirection: this.grid },
      this.align ? { alignItems: this.align } : {},
      this.props.style]}>

        {this.props.children}

      </View>

    );
  }
}

export default Container;
