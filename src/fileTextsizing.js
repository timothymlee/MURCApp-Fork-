import {Dimensions, Platform, PixelRatio  } from "react-native";
const React = require("react");



const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');
  
  // based on iphone 5s's scale
const scale = SCREEN_HEIGHT / 500;
  
export function normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 7
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}


module.exports = {
    normalize
}
