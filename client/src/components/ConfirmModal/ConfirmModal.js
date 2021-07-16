import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import AppText from "src/components/AppText";
import AppButton from "src/components/AppButton";

const ConfirmModal = ({ style, onConfirm, heading, confirmText, setModalHeight }) => {
  const onLayout = ({nativeEvent: {layout: {width}}}) => {
    setModalHeight?.(width);
  }

  return (
    <View onLayout={onLayout} style={{ ...styles.root, ...style }}>
      <AppText
        style={styles.section}
        textStyle={{ ...styles.text, color: "white" }}
      >
        {heading}
      </AppText>
      <AppText style={styles.section} textStyle={styles.text}>
        {confirmText}
      </AppText>
      <View style={{ ...styles.section, ...styles.row }}>
        <AppButton
          text="no" color="#ff0077"
          icon={require("src/images/buttons/generic/x.png")}
          onPress={onConfirm(false)}
          style={{width: 105}}
        />
        <AppButton
          text="yes"
          icon={require("src/images/buttons/generic/check.png")}
          onPress={onConfirm(true)}
          style={{width: 105}}
        />
      </View>
    </View>
  )};

export default ConfirmModal;
