import React from "react";
import { View } from "react-native";

import styles from "./styles";

const radius = 20;
const getIconTintStyle = i => ({
  position: "absolute",
  backgroundColor: "green",
  width: radius,
  height: 1,
  left: radius,
  top: radius,
  transform: [
    { translateY: -1 },
    { translateX: -radius / 2 },
    { rotate: `${-90 + i}deg`},
    { translateX: radius / 2 },
  ],
});

const DisableScreen = ({disabledPercent = 100}) => (
  disabledPercent > 0
  ? <View style={styles.root}>
      {
        [...Array(Math.floor(360 * disabledPercent / 100))].map((_, i) =>
        <View key={i} style={getIconTintStyle(i)} />)
      }
    </View>
  : null
);

export default DisableScreen;
