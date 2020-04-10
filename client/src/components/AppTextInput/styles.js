import { StyleSheet } from "react-native";

export default StyleSheet.create({
  text: {
    fontFamily: "montserrat-bold",
    color: "rgba(220,220,255,0.9)",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  root: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  input: {
    // backgroundColor: "#0000ff70",
    color: "white",
    flex: 1,
    fontSize: 20,
    padding: 5,
    paddingLeft: 15,
    height: 60,
    borderColor: "#7a42f4",
    borderWidth: 1,
    borderRadius: 15
  },
  inputIcon: {
    width: 25,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 15,
    opacity: 0.5
    // backgroundColor: "grey"
  },
  formattedWrapper: {
    flexDirection: "row",
    height: 60,
    flex: 1,
    padding: 5,
    paddingLeft: 15,
    borderColor: "#7a42f4",
    borderWidth: 1,
    borderRadius: 15
  },
  formattedText: {
    fontWeight: "100",
    fontFamily: "montserrat-regular",
    color: "rgba(220,220,255,0.9)",
    fontSize: 20
    // textAlign: "center"
  },
  invisible: {
    opacity: 0
  }
});
