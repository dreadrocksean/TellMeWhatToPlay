import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    // backgroundColor: 'blue',
    position: "relative",
    width: 150,
    // height: 40,
    aspectRatio: 394 / 162,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
  },
  back: {
    shadowOffset: {width: 0, height: 1},
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 0.7,
  },
  dark: {
    opacity: 0.3,
  },
  light: {
    opacity: 0.4,
  },
  hilight: {
    opacity: 0.4,
  },
  icon: {
    resizeMode: 'contain',
    width: "30%",
    height: "100%",
    shadowOffset: {width: 0, height: 0},
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    // backgroundColor: 'yellow',
  },
  info: {
    height: "35%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'blue',
  },
  textBorder: {
    position: "absolute",
    color: "black",
    opacity: 0.2,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  text: {
    position: "absolute",
    color: "white",
    fontWeight: "800",
    textShadowOffset: {width: 0, height: 0},
    textShadowColor: "black",
    textShadowRadius: 2,
    textTransform: "uppercase",
  }
});
