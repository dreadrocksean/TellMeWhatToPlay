import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    // flex: 1,
    justifyContent: "space-between",
    alignSelf: "stretch",
    minHeight: 150
    // backgroundColor: "gray"
  },
  section: {
    flex: 1
    // borderColor: "green",
    // borderWidth: 1
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "gray",
    justifyContent: "space-between"
  },
  imageWrapper: {
    flex: 1,
    maxWidth: "45%"
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  text: {
    fontFamily: "montserrat-regular",
    fontSize: 20,
    fontStyle: "normal",
    color: "rgba(255,255,255, 0.5)"
  }
});
