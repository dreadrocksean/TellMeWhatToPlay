import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "rgba(220,220,255,0.9)"
    // height: 45
    overflow: "hidden",
    // alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  logoWrap: {
    flex: 1
  },
  logo: {
    flex: 1,
    height: null,
    width: null
  },
  left: {
    flex: 1,
    justifyContent: "center"
    // backgroundColor: "cyan"
  },
  middle: {
    flex: 5,
    justifyContent: "center"
    // backgroundColor: "magenta"
  },
  right: {
    flex: 1,
    justifyContent: "center"
    // backgroundColor: "orange"
  }
});
