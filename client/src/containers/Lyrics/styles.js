import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
  textSuggestion: {
    fontStyle: "italic",
    color: "#ffd000"
  },
  iconWrapper: {
    width: 44,
    height: 44
  },
  icon: {
    width: "100%",
    height: "100%"
  },
  titleContainer: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    height: "auto",
    width: windowWidth * 0.7,
    maxWidth: 400,
    marginBottom: 20,
    alignItems: "center",
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  image: {
    flex: 1,
    aspectRatio: 1.5 / 1,
    borderTopLeftRadius: 60
  },
  artistContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  artist: {
    fontFamily: "montserrat-regular",
    color: "#ffd52b",
    fontSize: 16,
  },
  title: {
    fontFamily: "montserrat-regular",
    color: "#f18",
    textTransform: "uppercase",
    fontSize: 18,
    maxWidth: "95%",
    paddingHorizontal: 10
  },
  header: {
    flex: 1,
    flexDirection: "row"
  }
});
