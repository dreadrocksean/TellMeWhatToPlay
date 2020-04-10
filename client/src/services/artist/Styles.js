import React, { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  formRoot: {
    justifyContent: "space-between",
    flex: 1
    // paddingHorizontal: 10
  },
  container: {
    justifyContent: "space-between",
    // padding: 10,
    // paddingTop: 0,
    alignItems: "center",
    flex: 1
    // backgroundColor: "teal"
  },
  imageWrapper: {
    flex: 10,
    justifyContent: "center"
  },
  imageUpload: {
    // flex: 1,
    // marginBottom: 20,
    width: 80,
    height: 80
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
    height: 40,
    width: width * 0.8,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  input: {
    flex: 8,
    // backgroundColor: "orange",
    height: null,
    alignSelf: "stretch"
    // marginBottom: 10
    // height: 60
    // fontSize: 16
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
    flex: 1
  },
  sectionHeader: {
    flex: 2,
    // marginTop: 10,
    marginBottom: 12,
    marginLeft: 15,
    alignSelf: "flex-start"
  },
  radioSection: {
    flex: 5
  },
  checkBoxSection: {
    justifyContent: "space-between"
  },
  section: {
    flex: 10,
    overflow: "hidden",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // alignSelf: "flex-start",
    alignSelf: "stretch"
    // backgroundColor: "pink"
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontSize: 12
  },

  cambtn: {
    flexDirection: "row",
    width: 100,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  photos: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cancel: {
    // opacity: 0,
    alignSelf: "center",
    width: "50%"
    // marginBottom: 60
  }
  // image: {
  //   width: undefined,
  //   resizeMode: "contain"
  // }
});
