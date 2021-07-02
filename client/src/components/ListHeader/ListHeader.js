import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Logo from "src/images/logo.png";
import styles from "./styles";

const ListHeader = ({ style, home, headerLeft, headerMiddle, headerRight }) => {
  return (
    <View style={{ ...styles.root, ...style }}>
      <View style={styles.left}>{headerLeft || <View />}</View>
      <View style={styles.middle}>{headerMiddle || <View />}</View>
      <TouchableOpacity
        style={{ ...styles.right, ...styles.logoWrap }}
        onPress={home}
      >
      {
        headerRight
          ? headerRight
          : <Image style={styles.logo} source={Logo} resizeMode={"contain"} />
      }
      </TouchableOpacity>
    </View>
  );
};

export default ListHeader;
