import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // marginRight: 15,
    // backgroundColor: "#00800070",
    marginBottom: 12
  },
  box: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
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
    // marginLeft: 7
    // backgroundColor: "#ffffff70"
  },
  labelText: {
    // color: "#f3f3f3",
    fontSize: 11,
    fontFamily: "montserrat-bold",
    overflow: "hidden",
    textAlign: "left"
  }
});

export default styles;
