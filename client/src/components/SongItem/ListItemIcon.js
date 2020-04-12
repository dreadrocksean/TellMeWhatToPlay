import React from "react";
import { Image, View, TouchableOpacity } from "react-native";

import styles from "./styles";

const ListItemIcon = props => {
  const defaultProps = { tint: false };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View>
        <Image
          style={{ ...styles.image, ...props.styles }}
          source={props.icon}
          resizeMode={"cover"}
        />
        {props.tint && <View style={styles.iconTint} />}
      </View>
    </TouchableOpacity>
  );
};

export default ListItemIcon;
