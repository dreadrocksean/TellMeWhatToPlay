import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingTop: 0,
    padding: 5
  },
  deleteModal: {
    minHeight: 200
  },
  headerIconContatiner: {
    flexDirection: "row"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  search: {
    flex: 2
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 25,
    width: 25
  },
  scroll: {
    flex: 12
    // marginTop: 10
  },
  text: {
    fontSize: 20,
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
  },
  roundImage: { borderColor: "transparent" }
});
