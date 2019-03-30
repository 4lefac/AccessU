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
