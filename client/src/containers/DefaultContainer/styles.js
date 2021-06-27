import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    flex: 1,
    padding: 7
  },
  modal: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  listHeader: {
    // backgroundColor: "#80800070",
    zIndex: 1
  },
  children: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 12,
    padding: 10,
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
