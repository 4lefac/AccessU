/*
** A Header component is used to display title content.
**
** Properties:
**
** size - {1, 2, 3, 4, 5}. The size of the text. Default is 3.
** marginTopBottom - integer. Amount of margin space above and below the text.
*/



import React, { Component } from 'react';
import { Text } from 'react-native';



const sizeFactor = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 50,
}

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.size = this.props.size ? sizeFactor[this.props.size] : sizeFactor[3];
    this.margin = this.props.marginTopBottom ?
                  this.props.marginTopBottom : 10;
   }

  render() {
    return (
      <Text style={[{fontSize: this.size, fontWeight: 'bold',
      marginTop: this.margin, marginBottom: this.margin }, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }

}
