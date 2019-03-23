/*
** A Header component is used to display title content.
**
** Properties:
**
** size - {1, 2, 3, 4, 5}. The size of the text. Default is 3.
** marginTopBottom - integer. Amount of margin space above and below the text.
*/



import React from 'react';
import { Text } from 'react-native';

const sizeFactor = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 50,
}



const Header = (props) => {
  let size = props.size ? sizeFactor[props.size] : sizeFactor[3];
  let margin = props.marginTopBottom ? props.marginTopBottom : 10;
  return (
    <Text style={[{ fontSize: size, fontWeight: 'bold', marginTop: margin,
    marginBottom: margin }, props.style]}>
      {props.children}
    </Text>
  );
}

export default Header;
