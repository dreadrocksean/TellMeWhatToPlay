import { StyleSheet } from "react-native";
import { width, height } from "src/utils/General";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5
  },
  text: {
    color: "rgba(220,220,255,0.9)",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
    // fontFamily: 'montserrat-bold',
  },
  textCustomPos: {
    marginTop: 40
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 25,
    width: 25
  },
  imageButton: {
    height: 70,
    width: width * 0.8,
    backgroundColor: "red",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  buttonImage: {
    position: "absolute",
    borderRadius: 35,
    flex: 1,
    zIndex: -1,
    top: 0,
    left: 0,
    height: 70,
    width: width * 0.8,
    borderColor: "white",
    borderWidth: 4
  },
  buttonContent: {
    alignItems: "center",
    borderRadius: 100
  },
  buttonText: {
    fontWeight: "bold"
  },
  textSeparator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    width: width * 0.6
  },
  line: {
    borderBottomColor: "rgba(220,220,255,0.9)",
    borderBottomWidth: 3,
    flex: 3
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    resizeMode: "cover"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    // margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
