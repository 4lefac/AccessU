/*
** A Header component is used to display title content.
**
** Properties:
**
** size - {1, 2, 3, 4, 5}. The size of the text. Default is 3.
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

class Header extends Component {
  constructor(props) {
    super(props);

    this.size = sizeFactor[this.props.size] || sizeFactor[3];

  }

  render() {
    return (
      <Text style={[{fontSize: this.size, marginTop: 10, marginBottom: 10}]}>
        {this.props.children}
      </Text>
    );
  }

}

export default Header;
