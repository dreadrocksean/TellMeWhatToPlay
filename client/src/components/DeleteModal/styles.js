import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imageWrapper: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  text: {
    fontFamily: "montserrat-regular",
    fontSize: 16,
    fontStyle: "normal",
    color: "rgba(255,255,255, 0.5)"
  }
});
