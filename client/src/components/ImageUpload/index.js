import React, { Component } from "react";
import {
  StyleSheet,
  ViewPropTypes,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles.js";
import AppText from "src/components/AppText";
import IconGrey from "src/images/icons/cam_icon_grey.png";
import IconWhite from "src/images/icons/cam_icon_white.png";

const ImageUpload = ({ label, style, onPress, source }) => {
  const Icon = source ? IconWhite : IconGrey;
  const textColor = { color: source ? "#f3f3f3" : "#bbbbbb" };
  return (
    <TouchableOpacity style={[style, styles.container]} onPress={onPress}>
      <View style={styles.bg}>
        <Image style={styles.image} source={source} />
        {source && <View style={styles.imageOverlay} />}
      </View>
      <Image style={styles.icon} source={Icon} />
      <AppText textStyle={{ ...styles.text, ...textColor }}>
        UPLOAD PHOTO
      </AppText>
    </TouchableOpacity>
  );
};

ImageUpload.propTypes = {
  onPress: PropTypes.func,
  // image: PropTypes.image,
  styles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    ViewPropTypes.style
  ])
};

export default ImageUpload;
