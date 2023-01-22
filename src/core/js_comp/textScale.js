import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

function Scale(size){
    const scale= size => width / guidelineBaseWidth * size;
    return(scale)
}
function VerticalScale(size){
    const verticalScale = size => height / guidelineBaseHeight * size;
    return(verticalScale)
}
function ModerateScale(size){
    const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;
    return(moderateScale)
}
   


export {Scale, VerticalScale, ModerateScale};