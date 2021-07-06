import React from "react";
import { Image, View, TouchableOpacity } from "react-native";

import styles from "./styles";

const ListItemIcon = ({onPress, onLongPress, styles: propStyles, icon, tint}) => {
  const defaultProps = { tint: false };

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View>
        <Image
          style={{ ...styles.image, ...propStyles }}
          source={icon}
          resizeMode={"cover"}
        />
        {tint && <View style={styles.iconTint} />}
      </View>
    </TouchableOpacity>
  );
};

export default ListItemIcon;
