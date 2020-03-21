import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    padding: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 25,
    width: 25
  },
  scroll: {
    flex: 1,
    marginTop: 10
  },
  text: {
    fontSize: 36,
    color: "white",
    fontFamily: "montserrat-regular"
  },
  artistInfo: {
    height: 70,
    justifyContent: "center",
    marginLeft: 10
  },
  artistInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  }
});
