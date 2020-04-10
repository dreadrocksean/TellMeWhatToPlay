import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    // marginTop: 15,
    flex: 1
    // backgroundColor: "transparent",
    // backgroundColor: "#ffffff70"
  },
  form: {
    flex: 1,
    padding: 10
    // backgroundColor: "#ffffff70"
  },
  input: {
    marginBottom: 10
  },
  label: {
    marginTop: 10,
    marginBottom: 12
  },
  labelText: {
    fontSize: 14
  },
  submitButton: {
    display: "flex",
    alignItems: "center"
  },
  submitButtonText: {
    color: "white"
  },
  error: {
    color: "red"
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain"
  },
  imageWrapper: {
    height: 60,
    marginTop: 20,
    alignSelf: "stretch"
  }
});
