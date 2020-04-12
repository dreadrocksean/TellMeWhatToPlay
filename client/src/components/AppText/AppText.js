import React from "react";
import { ViewPropTypes, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const AppText = ({ style, textStyle, numberOfLines, children, ellipsis }) => (
  <View style={{ ...styles.root, ...style }}>
    <Text
      style={{ ...styles.text, ...textStyle }}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  </View>
);

AppText.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    ViewPropTypes.style
  ]),
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
  numberOfLines: PropTypes.number,
  children: PropTypes.any
};

export default AppText;
