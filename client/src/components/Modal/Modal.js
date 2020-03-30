import React from "react";
import { Dimensions, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import AppText from "src/components/AppText";
import closeIcon from "src/images/icons/close_icon.png";

const Modal = ({ children, hideCloseButton, dismiss, styles: pStyles }) => (
  <View style={styles.container}>
    <View style={[styles.window, pStyles]}>
      {children}
      {!hideCloseButton && (
        <TouchableOpacity style={styles.closeWrapper} onPress={dismiss}>
          <Image source={closeIcon} style={styles.close} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default Modal;
