import { StyleSheet } from "react-native";
import listItemStyle from "../ListItem/styles";

const iconSize = 40;

export default StyleSheet.create({
  ...listItemStyle,
  root: {
    flexDirection: "row",
    flex: 1,
    width: "100%"
  },
  gImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  image: {
    width: iconSize,
    height: iconSize
  },
  iconTint: {
    position: "absolute",
    top: 0,
    left: 0,
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    backgroundColor: "green",
    opacity: 0.4
  },
  scoreIcon: {
    width: iconSize * 0.4,
    height: iconSize * 0.4,
    marginBottom: 4
  },
  voteIcon: {
    marginRight: 36
  },
  scoreContainer: {
    position: "absolute",
    right: 0,
    height: iconSize,
    justifyContent: "center"
    // backgroundColor: 'rgba(0,0,255,0.3)',
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 6
    // backgroundColor: "brown"
  },
  itemInfo: {
    flex: 18,
    // backgroundColor: "rgba(0,0,255,0.3)",
    paddingLeft: 5
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 7
    // backgroundColor: "yellow"
  },
  text: {
    // fontWeight: "normal",
    textAlign: "left"
    // fontFamily: "montserrat-regular"
  },
  titleText: { fontSize: 16 },
  artistText: { color: "#999", fontSize: 11 },
  score: {
    flexDirection: "row",
    backgroundColor: "#fcc819",
    height: iconSize / 2,
    width: 70,
    borderRadius: iconSize * 0.875,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10
  },
  scoreText: {
    color: "white",
    fontSize: iconSize * 0.3,
    fontWeight: "bold",
    marginTop: -3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1
    // backgroundColor: 'rgba(0,0,255,0.3)',
  }
});
