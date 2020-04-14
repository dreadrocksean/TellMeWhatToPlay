import React from "react";
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
import Check from "src/images/icons/check_icon.png";
import AppText from "src/components/AppText";

const CheckBox = ({
  style,
  labelStyle,
  checkBoxStyle,
  onPress,
  checked,
  label,
  disabled,
  ellipsis
}) => {
  const disabledStyles = disabled
    ? {
        opacity: 0.5
      }
    : {};
  return (
    <TouchableOpacity
      style={{ ...styles.root, ...style }}
      onPress={disabled ? null : onPress}
      activeOpacity={disabled ? 1 : 0.2}
    >
      <View style={{ ...styles.box, ...disabledStyles, ...checkBoxStyle }}>
        {checked && <Image style={styles.image} source={Check} />}
      </View>
      <AppText
        textStyle={{ ...styles.labelText, ...labelStyle }}
        style={{ ...styles.label, ...disabledStyles }}
        numberOfLines={ellipsis ? 1 : 0}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

CheckBox.propTypes = {
  onPress: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool
};

export default CheckBox;
