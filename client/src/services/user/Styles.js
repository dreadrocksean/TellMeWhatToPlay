import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: "transparent"
  },
  form: {
    padding: 10
  },
  input: {
    backgroundColor: "#f3f3f3",
    color: "purple"
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
  }
});
