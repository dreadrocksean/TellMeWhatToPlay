import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  icon: {
    width: 45,
    height: 45
  },
  button: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  row: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "transparent"
  },
  topTop: {
    flex: 12
    // backgroundColor: "cyan"
  },
  profileImage: {
    borderColor: "#ffd72b",
    borderWidth: 4
  },
  topMiddle: {
    // backgroundColor: "pink",
    flex: 4
  },
  title: {
    color: "white",
    fontSize: 26,
    textAlign: "center",
    fontFamily: "montserrat-regular"
  },
  topBottom: {
    // backgroundColor: "teal",
    flex: 4
  },
  top: {
    flex: 12,
    justifyContent: "space-around",
    alignItems: "center"
    // backgroundColor: "#666"
  },
  middle: {
    flex: 6,
    // backgroundColor: "#888",
    justifyContent: "center"
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 10
  },
  mainBox: {
    flex: 1,
    alignItems: "center"
    // backgroundColor: "tan"
  },
  bottom: {
    flex: 6,
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "#aaa",
    overflow: "hidden"
  },
  headingText: {
    color: "white",
    fontSize: 20
  },
  h2: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#ffb401",
    fontFamily: "montserrat-regular"
  },
  h3: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-regular"
  },
  error: {
    color: "red",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center"
  },
  hamburger: {
    flex: 1
  },
  image: {
    flex: 1,
    // width: null,
    // height: null,
    resizeMode: "contain"
  },
  text: {
    fontSize: 36,
    textAlign: "center"
  }
});
