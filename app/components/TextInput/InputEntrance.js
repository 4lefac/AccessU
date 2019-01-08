import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, Text,View} from 'react-native'
import styles from './styles';
const InputEntrance = () => {
    return(
        <View style = {styles.container} >
            <TextInput
            style = {styles.input}
            placeholder = 'Find an Entrance'
            />
        </View>
    )
};

InputEntrance.propTypes = {
}

export default InputEntrance;