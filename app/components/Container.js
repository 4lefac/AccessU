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



import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Theme from '../styles/Theme';



const styles = EStyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Theme.BackgroundColor,
  },
  '@media ios': {
    Container: { paddingTop: '5%', }
  },
});

const Container = (props) => {
  let grid = props.grid || 'column';
  let align;

  if (props.grid) {
    switch (props.alignment) {
      case 'start': { align = 'flex-start'; break; }
      case 'end': { align = 'flex-end'; break; }
      case 'center': { align = 'center'; break; }
      default: break;
    }
  }

  return (
    <View style={[styles.Container, { flexDirection: grid },
    align ? { alignItems: align } : {}, props.style]}
    onLayout={props.onLayout}>
      {props.children}
    </View>
  );

}

export default Container;
