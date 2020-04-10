import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    // backgroundColor: "#ffffff77",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    // marginBottom: 10
  },
  circle: {
    borderColor: "#ebca0b",
    borderWidth: 3,
    borderRadius: 25,
    width: 25,
    height: 25,
    padding: 3,
    marginRight: 5
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  label: {
    marginLeft: 7
  },
  labelText: {
    color: "#f3f3f3",
    fontSize: 11,
    fontFamily: "montserrat-bold"
  }
});

export default styles;
