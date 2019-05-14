const styles = {
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  itemContainer: {
    flex: 1,
    borderRadius: 22,
    borderColor: "white",
    borderWidth: 4,
    borderBottomWidth: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 8
  },
  item: {
    flex: 1,
    height: 62,
    borderRadius: 18,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1
  },
  itemActive: {
    backgroundColor: "#fff6d8",
    shadowColor: "#edbc78"
  },
  itemDisabled: {
    backgroundColor: "#e1e1e1",
    shadowColor: "#bbb"
  },
  button: {
    position: "absolute",
    // left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // backgroundColor: 'rgba(0,255,0,0.3)',
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  leftInfo: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  info: {
    marginLeft: 15,
    justifyContent: "space-around"
    // backgroundColor: '#ddd',
  },
  rightInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
    // height: '100%',
    // backgroundColor: '#ddd',
  }
};

export default styles;
