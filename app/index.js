import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StyleSheet} from 'react-native'
import Home from './screens/Home'

EStyleSheet.build({
    //put global styles here
    $white: '#FFFFFF',
    $inputText: '#000000',
});

export default () => <Home/>;