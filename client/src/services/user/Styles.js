import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: "transparent"
  },
  form: {
    padding: 10
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
