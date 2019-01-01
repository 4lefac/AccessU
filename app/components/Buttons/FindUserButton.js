import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableOpacity, Image, View,
} from 'react-native';

import styles from './styles';

const FindUserButton = ({onPress }) => (
  <TouchableOpacity onPress={onPress}>
      <Image resizeMode="contain" style={styles.icon} source={require('./images/focus.png')} />
  </TouchableOpacity>
);

FindUserButton.propTypes = {
  onPress: PropTypes.func,
};

export default FindUserButton;
