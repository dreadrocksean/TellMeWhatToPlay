import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.74)",
    paddingVertical: 10
  },
  modal: {
    width: "80%",
    padding: 30,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#281955",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10
  },
  closeWrapper: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 34,
    height: 34
  },
  close: {
    width: null,
    height: null,
    flex: 1
  }
});
