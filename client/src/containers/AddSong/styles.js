const styles = {
  test: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#ffffff70"
  },
  title: {
    flex: 2,
    alignSelf: "stretch"
    // backgroundColor: "#00800070"
  },
  asis: {
    alignItems: "center"
    // backgroundColor: "#f3f3f360"
  },
  asIsLabel: {
    width: 50
    // backgroundColor: "#00800070"
  },
  image: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "contain"
  },
  fieldsWrapper: {
    alignSelf: "stretch",
    flex: 1
  },
  dropdown: {
    // zIndex: 1,
    backgroundColor: "#f3f3f3",
    position: "absolute",
    left: 0,
    top: 70,
    width: "100%",
    height: 300,
    // flex: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: "#dddddd",
    borderWidth: 2
  },
  listHeading: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: "#f3f3f3"
  },
  listFooter: {},
  listHeadingText: {
    textAlign: "left",
    color: "#c4c4c4",
    fontSize: 11
  },
  listItem: {
    borderColor: "#dddddd",
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 10
  },
  listItemText: {
    color: "#9e9e9e",
    fontSize: 15,
    textAlign: "left"
  },
  inputContainer: {
    flex: 4,
    alignSelf: "stretch"
    // minHeight: 70
    // backgroundColor: "#80800070",
    // zIndex: 1
  },
  autocomplete: {
    zIndex: 0,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  input: {
    alignSelf: "stretch",
    padding: 5
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 20,
    color: "white"
  },
  buttonWrapper: {
    flex: 12,
    alignSelf: "stretch",
    justifyContent: "flex-end",
    // backgroundColor: "#7a42f4",
    zIndex: -1
  },
  submitButton: {
    height: 60,
    alignSelf: "stretch"
  },
  submitButtonText: {
    color: "white"
  }
};

export default styles;
