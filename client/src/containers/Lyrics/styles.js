import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    flex: 1
  },
  text: {
    fontSize: 20,
    color: "#d4d4d4"
  },
  iconWrapper: {
    // backgroundColor: "white",
    // flex: 1,
    width: 44,
    height: 44
  },
  icon: {
    // flex: 1,
    width: "100%",
    height: "100%"
  },
  title: {
    fontFamily: "montserrat-regular",
    color: "#f18",
    textTransform: "uppercase",
    fontSize: 18,
    // backgroundColor: "gold",
    maxWidth: "95%",
    paddingHorizontal: 10
  },
  header: {
    flex: 1,
    // maxWidth: "100%",x
    flexDirection: "row"
  }
});
