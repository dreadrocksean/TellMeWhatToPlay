import { StyleSheet } from "react-native";

export default StyleSheet.create({
  component: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: 'rgba(220,220,255,0.9)',
    height: 45
  },
  logoWrap: {
    alignSelf: "flex-end",
    height: 65,
    width: 65
  },
  logo: {
    flex: 1,
    height: null,
    width: null
  },
  children: {
    // backgroundColor: "grey",
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
