import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    flex: 1,
    padding: 10
    // marginBottom: 40
  },
  headerText: {
    flex: 1,
    color: "#55eeff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    paddingVertical: 10
  },
  container: {
    flex: 20,
    borderWidth: 1,
    borderColor: "purple",
    borderStyle: "dashed",
    backgroundColor: "rgba(255,255,255, 0.5)"
  },
  text: {
    flex: 1,
    fontSize: 20,
    color: "#4d4d4d",
    padding: 10
  },
  buttonContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 20
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  }
});
