import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between"
    // height: 50
  },
  logoWrap: {
    flex: 1
  },
  logo: {
    flex: 1,
    height: null,
    width: null,
    right: -10
  },
  left: {
    flex: 1,
    justifyContent: "center"
    // backgroundColor: "cyan"
  },
  middle: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "magenta"
  },
  right: {
    flex: 1,
    justifyContent: "center"
    // backgroundColor: "orange"
  }
});
