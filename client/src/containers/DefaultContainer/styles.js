import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    // zIndex: 0,
    flex: 1,
    padding: 7
    // justifyContent: "flex-start"
  },
  listHeader: {
    // backgroundColor: "#80800070",
    zIndex: 1
    // flex: 1
    // height: 50
  },
  children: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 12,
    // paddingTop: 60,
    // backgroundColor: "#80008070",
    justifyContent: "space-between"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddccff"
  },
  body: {
    marginTop: 0
  }
});
