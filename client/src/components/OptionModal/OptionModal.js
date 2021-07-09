import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import AppText from "src/components/AppText";
import yesButton from "src/images/buttons/yes_btn.png";
import noButton from "src/images/buttons/no_btn.png";

const OptionModal = ({ style, onConfirm, heading, confirmText, hideModal }) => {

  const _onConfirm = confirm => () => {
    hideModal?.();
    onConfirm(confirm)
  }

  return (
    <View style={{ ...styles.root, ...style }}>
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
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={_onConfirm(false)}
        >
          <Image style={styles.image} source={noButton} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageWrapper} onPress={_onConfirm(true)}>
          <Image style={styles.image} source={yesButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OptionModal;
