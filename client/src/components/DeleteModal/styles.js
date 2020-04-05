import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    height: "50%"
  },
  container: {
    justifyContent: "space-between"
    // backgroundColor: "gray"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imageWrapper: {
    flex: 1,
    maxWidth: "45%"
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  text: {
    fontFamily: "montserrat-regular",
    fontSize: 20,
    fontStyle: "normal",
    color: "rgba(255,255,255, 0.5)"
  }
});
