import { StyleSheet } from "react-native";
import { width, height } from "src/utils/General";

const styles = StyleSheet.create({
  autocomplete: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    fontSize: 20,
    padding: 5,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  input: {
    position: "relative",
    fontSize: 20,
    padding: 5,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    color: "white"
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#7a42f4",
    padding: 10,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});

export default styles;
