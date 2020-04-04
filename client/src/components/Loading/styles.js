import { StyleSheet } from "react-native";
import { width, height } from "src/utils/General";

export default StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    // borderWidth: 1,
    // borderColor: "white",
    overflow: "hidden"
    // backgroundColor: "yellow"
  },
  bar: {
    opacity: 0.5,
    backgroundColor: "white",
    width: 5
  }
});
