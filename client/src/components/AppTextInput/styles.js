import { StyleSheet } from "react-native";

export default StyleSheet.create({
  text: {
    fontFamily: "montserrat-bold",
    color: "rgba(220,220,255,0.9)",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  container: {
    flexDirection: "row"
  },
  input: {
    color: "white",
    // flex: 1,
    width: "100%",
    fontSize: 20,
    padding: 5,
    paddingLeft: 15,
    height: 60,
    borderColor: "#7a42f4",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 15
  },
  inputIcon: {
    width: 25,
    height: 60,
    position: "absolute",
    right: 15,
    opacity: 0.5
    // backgroundColor: 'grey',
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
