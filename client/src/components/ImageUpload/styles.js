import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#f3f3f3",
    // width: 150,
    // height: 150,
    borderRadius: 200,
    // padding: 15,
    overflow: "hidden"
  },
  icon: {
    flex: 0.4,
    // width: "50%",
    // height: "50%",
    opacity: 0.7
    // resizeMode: "contain"
  },
  appText: {
    maxWidth: 80
  },
  text: {
    fontSize: 10,
    color: "#bbbbbb"
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  image: {
    flex: 1,
    width: null,
    height: null
    // resizeMode: "cover"
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)"
  }
});

export default styles;
