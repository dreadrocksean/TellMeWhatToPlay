import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 7
  },
  children: {
    flex: 1,
    paddingTop: 10,
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
