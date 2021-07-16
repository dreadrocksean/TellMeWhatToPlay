import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import base from "src/images/buttons/generic/base.png";
import back from "src/images/buttons/generic/back.png";
import dark from "src/images/buttons/generic/dark.png";
import light from "src/images/buttons/generic/light.png";
import hilight from "src/images/buttons/generic/hilight.png";

import styles from "./styles";

const origWidth = styles.root.width;
const rootFontSize = 20;

const AppButton = ({ text, icon, color, onPress=()=>{}, style }) => {
  const [width, setWidth] = useState(1000);

  const factor = (style.width ?? origWidth) / origWidth;
  const imageArray = [
    {img: base},
    {img: back, style: {...styles.back, tintColor: color}},
    {img: dark, style: {...styles.dark}},
    {img: light, style: {...styles.light}},
    {img: hilight, style: {...styles.hilight}},
  ];

  const textBorderContainer = {
      width: icon ? "35%" : width + 15 / factor,
      height: "100%",
      // backgroundColor: 'blue',
  };
  const textBorderStyles = {
    ...styles.textBorder,
    top: -3,
    left: 0,
    fontSize: rootFontSize * 1.2 * factor,
    letterSpacing: -5,
  };
  const textStyles = {
    ...styles.text,
    top: -1 / factor,
    left: 1.7 * factor,
    fontSize: rootFontSize * factor,
    letterSpacing: -0.3 * factor,
  };

  const onTextLayout = ({nativeEvent: {layout: {width}}}) => {
    setWidth(width);
  }

  return (
    <TouchableOpacity style={{...styles.root, ...style}} onPress={onPress}>
      {imageArray.map((item, i) => 
        <Image key={i} style={{...styles.image, ...(item.style ?? {})}} source={item.img} />
      )}
      <View style={styles.info}>
        {icon && <Image style={styles.icon} source={icon} />}
        <View style={textBorderContainer}>
          <Text onLayout={onTextLayout} style={textBorderStyles}>{text}</Text>
          <Text style={textStyles}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default AppButton;