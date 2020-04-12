import React from "react";
import { TextInput, View, Image } from "react-native";

import styles from "./styles";
import AppText from "src/components/AppText";
import Icon from "src/images/icons/danger_icon.png";

const FormError = ({ children, style }) => (
  <View style={{ ...styles.container, ...style }}>
    <Image source={Icon} style={styles.icon} resizeMode="contain" />
    <AppText textStyle={styles.text}>{children}</AppText>
  </View>
);

export default FormError;
