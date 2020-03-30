import { StyleSheet } from "react-native";

export default StyleSheet.create({
  children: {
    justifyContent: "space-between",
    marginBottom: 20
  },
  child: {
    marginBottom: 10
  },
  imageWrapper: {
    width: "100%",
    minHeight: 60,
    flexDirection: "row"
  },
  image: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "contain"
  }
});
