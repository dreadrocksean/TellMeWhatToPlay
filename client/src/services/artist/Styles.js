import React, { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  formRoot: {
    justifyContent: "space-between",
    flex: 1
    // backgroundColor: "#ffffff70"
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
    // backgroundColor: "teal"
  },
  imageWrapper: {
    flex: 10,
    justifyContent: "center"
  },
  firstInput: {
    // marginTop: 30
    // backgroundColor: "green"
  },
  imageUpload: {
    width: 100,
    height: 100
  },
  autocomplete: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    fontSize: 20,
    padding: 5,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  inputText: {
    position: "relative",
    fontSize: 20,
    padding: 5,
    // height: 40,
    width: width * 0.8,
    // borderColor: "#7a42f4",
    borderWidth: 1
  },
  input: {
    flex: 8,
    // backgroundColor: "orange",
    height: null,
    alignSelf: "stretch",
    justifyContent: "center",
    marginBottom: 0
    // height: 60
    // fontSize: 16
  },
  labels: {
    maxWidth: 40
  },
  button: {
    // alignSelf: "flex-start",
    flex: 10,
    width: "100%"
    // backgroundColor: "cyan",
    // justifyContent: "flex-start"
    // marginTop: 20
  },
  image: {
    flex: 1,
    // width: "100%"
    // height: 60
    width: null,
    height: null,
    resizeMode: "contain"
  },
  submitButtonText: {
    color: "white"
  },
  h2: {
    fontSize: 13,
    fontFamily: "montserrat-bold",
    color: "rgba(220,220,255,0.7)"
  },
  separator: {
    flex: 3
    // backgroundColor: "#ffffff70"
  },
  radioSection: {
    flex: 5,
    flexWrap: "nowrap",
    justifyContent: "space-around"
  },
  checkBoxSection: {
    justifyContent: "space-between"
  },
  section: {
    flex: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ffffff70",
    alignSelf: "stretch"
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontSize: 12
  }
});
