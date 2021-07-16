import React from "react";
import { Image, View, TouchableOpacity } from "react-native";

import DisableScreen from "./DisableScreen/DisableScreen";

import styles from "./styles";

const ListItemIcon = ({
  onPress, onLongPress, styles: propStyles, icon, disabledPercent, showScreen
}) => (
  <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
    <View>
      <Image
        style={{ ...styles.image, ...propStyles }}
        source={icon}
        resizeMode={"cover"}
      />
      {showScreen && <DisableScreen disabledPercent={disabledPercent} />}
    </View>
  </TouchableOpacity>
);

export default ListItemIcon;
