import React, { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  formRoot: {
    justifyContent: "space-between",
    flex: 1
  },
  container: {
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 0,
    alignItems: "center",
    flex: 1
  },
  photoTouch: {
    width: 150,
    height: 150,
    backgroundColor: "grey"
  },
  imageUpload: {
    marginTop: -0,
    marginBottom: 20
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
    marginBottom: 10
  },
  button: {
    alignSelf: "center",
    width: "100%",
    marginTop: 20
  },
  image: {
    width: undefined,
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
  sectionHeader: {
    // marginTop: 10,
    marginBottom: 12,
    marginLeft: 15,
    alignSelf: "flex-start"
  },
  section: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignSelf: "flex-start"
  },
  error: {
    color: "red"
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
  },
  image: {
    width: undefined,
    resizeMode: "contain"
  }
});
