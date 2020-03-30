import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Logo from "src/images/logo.png";
import styles from "./styles";

const ListHeader = props => {
  return (
    <View style={styles.component}>
      <View style={styles.children}>
        {props.children || <View />}
        <TouchableOpacity style={styles.logoWrap} onPress={props.home}>
          <Image style={styles.logo} source={Logo} resizeMode={"contain"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListHeader;
