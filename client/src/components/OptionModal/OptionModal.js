import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import AppText from "src/components/AppText";
import AppButton from "src/components/AppButton";

const OptionModal = ({ style, onConfirm, heading, buttonTextLeft, buttonTextRight, setModalHeight }) => {
  

  const onLayout = ({nativeEvent: {layout: {width}}}) => setModalHeight(width);
  return (
    <View onLayout={onLayout} style={{ ...styles.root, ...style }}>
      <AppText
        style={styles.section}
        textStyle={{ ...styles.text, color: "white" }}
      >
        {heading}
      </AppText>
      <View style={{ ...styles.section, ...styles.row }}>
        <AppButton
          text={buttonTextLeft} color="#ff0055"
          onPress={onConfirm(false)}
          style={{width: 110}}
        />
        <AppButton
          text={buttonTextRight}
          onPress={onConfirm(true)}
          style={{width: 110}}
        />
      </View>
    </View>
  );
};

export default OptionModal;
