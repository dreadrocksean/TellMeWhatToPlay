import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerText: {
    flex: 1,
    color: "#55eeff",
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "normal"
  },
  container: {
    flex: 15,
    borderWidth: 1,
    borderColor: "purple",
    borderStyle: "dashed",
    backgroundColor: "rgba(255,255,255, 0.5)"
  },
  text: {
    fontSize: 20,
    color: "#363636",
    padding: 10
  },
  buttonContainer: {
    flex: 2,
    marginTop: 20
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  }
});
