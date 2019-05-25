/*
** all global functions and variables are stored here
*/

import {
  Animated,
  AsyncStorage,
  Easing,
} from 'react-native';

/*
** application info
*/
export {
  name as NAME,
  version as VERSION,
} from '../../app.json';

/*
** theme
*/
export Theme from './Theme';

/*
** stores persistent data in local memory (returns Promise)
*/
export async function CacheData(key, item) {
  try {
    return await AsyncStorage.setItem(NAME + '_' + key, JSON.stringify(item));
  } catch (error) {
    console.log(error.message);
  }
}

/*
** get persistent data in local memory (returns Promise)
*/
export async function GetCacheData(key) {
  try {
    return JSON.parse(await AsyncStorage.getItem(NAME + '_' + key));
  } catch (error) {
    console.log(error.message);
  }
}

/*
** Removes peresistent data in local memory (returns Promise)
*/
export async function RemoveCacheData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
}

/*
** animation time
*/
export const ANIMATE_TIME = 500;

/*
** animate to value
*/
export const Animate = (prop, val, time) => {
  time = time || this.ANIMATE_TIME;
  Animated.timing(prop, {
    toValue: val,
    easing: Easing.linear(),
    duration: time,
  }).start();
}
