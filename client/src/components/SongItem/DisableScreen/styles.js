import { StyleSheet } from "react-native";

const iconSize = 40;
const radius = iconSize / 2;
const innerRadius = iconSize * 0.8 / 2;

export default StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    width: iconSize,
    height: iconSize,
    borderRadius: radius,
    opacity: 0.4
  },
});
