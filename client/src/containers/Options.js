import React, { useState, useEffect, useRef, memo } from "react";
import {
  // Platform,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
  Image
} from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { Button as RNButton, Icon } from "react-native-elements";

import { saveStorage, loadStorage } from "src/services/LocalStorage";
import { getDocs } from "src/services/api";
import {
  loginUser,
  loginArtist,
  logout as logoutAction,
  guestTypeFan,
  guestTypeArtist,
  onAir,
  offAir
} from "src/store/actions/ActionCreator";
import * as ActionTypes from "src/store/actions/ActionTypes";

import DefaultContainer from "./DefaultContainer";
import { updateHeader } from "src/utils/UpdateHeader";
import AppText from "src/components/AppText";
import CheckBox from "src/components/CheckBox/";
import RadioButton from "src/components/RadioButton/";

import bg from "src/images/bg.png";
import fanButton from "src/images/buttons/fan_btn.png";
import artistButton from "src/images/buttons/artist_btn.png";

const { height, width } = Dimensions.get("window");

const Options = ({
  navigation,
  authorized,
  userType,
  artist,
  user,
  logout,
  loginUser,
  loginArtist,
  guestTypeFan,
  guestTypeArtist,
  onAir,
  offAir
}) => {
  const [showModal, setShowModal] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkBox, setCheckbox] = useState(false);
  const [radioButton, setRadioButton] = useState(false);

  useEffect(() => {
    checkLocalUserStorage();
    // checkLocalArtistStorage();
  }, []);

  useEffect(() => {
    // updateHeader({ navigation, authorized, artist });
  }, [navigation, authorized, artist]);

  const checkLocalUserStorage = async () => {
    //Set store on mount
    try {
      const storedUser = await loadStorage("user");
      // console.log('Options checkLocalUserStorage user', user);
      if (!user && storedUser) {
        loginUser(storedUser);
        getArtist(storedUser._id);
      } else if (!user && !storedUser) {
        throw Error("No user exists");
      }
      // updateHeader({ navigation, authorized, artist });
    } catch (err) {
      console.log("load storage error", err);
      setErrorMessage(err);
      logout();
      // updateHeader({ navigation, authorized, artist });
    }
  };

  const getArtist = async userId => {
    try {
      // console.log('getArtist userId', userId);
      const res = await getDocs("artist", { userId });
      const currArtist = res.data;
      // console.log('getArtist', artist);
      if (!currArtist) {
        const storageArtist = await loadStorage("artist");
        if (!storageArtist) {
          return;
        }
        loginArtist(storageArtist);
        (storageArtist.live ? onAir : offAir)();
        // return saveStorage({ artist: storageArtist });
      }
      loginArtist(currArtist);
      (currArtist.live ? onAir : offAir)();
      // saveStorage({ currArtist });
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const checkLocalArtistStorage = async () => {
    try {
      await loadStorage("artist");
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const onClick = userType => async () => {
    const routeName = getRouteName(userType);
    if (userType === "ARTIST" && user && !artist) {
      await getArtist(user._id);
    }
    navigation.navigate(routeName, { name: routeName });
  };

  const getRouteName = userType => {
    const artistAuth = artist && Object.keys(artist).length > 0;
    switch (userType) {
      case "ARTIST": {
        guestTypeArtist();
        if (!authorized) {
          return "UserSignup";
        } else if (!artistAuth) {
          return "ArtistSignup";
        }
        return "ArtistAdmin";
      }
      case "FAN": {
        guestTypeFan();
        return "ArtistList";
      }
      default:
        return null;
    }
  };

  const renderButton = (text, onPress) => (
    <TouchableHighlight onPress={onPress} style={styles.close}>
      <View>
        <Text
          style={{
            color: "#d4d4ff",
            fontSize: 20,
            alignItems: "center",
            textAlign: "center"
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const toggleCheckbox = () => setCheckbox(!checkbox);

  const toggleRadioButton = () => setRadioButton(!radioButton);

  return (
    <DefaultContainer>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <TouchableHighlight onPress={onClick("FAN")}>
            <View>
              <Image source={fanButton} resizeMode={"cover"} />
            </View>
          </TouchableHighlight>
          <View style={styles.textSeparator}>
            <View style={styles.line} />
            <AppText style={[{ flex: 2 }]}>OR</AppText>
            <View style={styles.line} />
          </View>
          <TouchableHighlight onPress={onClick("ARTIST")}>
            <View>
              <Image source={artistButton} resizeMode={"cover"} />
            </View>
          </TouchableHighlight>
          <AppText style={[styles.textCustomPos]}>PLEASE SELECT</AppText>
        </View>
      </View>
    </DefaultContainer>
  );
};

const styles = StyleSheet.create({
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
    position: "absolute",
    top: -60
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 25,
    width: 25
    // borderRadius: 25,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  imageButton: {
    height: 70,
    width: width * 0.8,
    backgroundColor: "red",
    // borderColor: 'white',
    // borderWidth: 4,
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

// Options.navigationOptions = ({ navigation }) => {
//   const { params = {} } = navigation.state;
//
//   return {
//     title: `${params.title || params.screen || "Options"}`,
//     headerTitleStyle: { textAlign: "center", alignSelf: "center" },
//     headerStyle: {
//       backgroundColor: `${params.bg || "red"}`
//     },
//     headerLeft: null
//   };
// };

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  userType: state.login.userType,
  artist: state.login.artist,
  user: state.login.user,
  errorMessage: state.login.errorMessage
});

const mapDispatchToProps = dispatch => ({
  logout: () => logoutAction(dispatch),
  loginUser: user => dispatch(loginUser(user)),
  loginArtist: artist => dispatch(loginArtist(artist)),
  guestTypeFan: () => dispatch(guestTypeFan()),
  guestTypeArtist: () => dispatch(guestTypeArtist()),
  onAir: () => dispatch(onAir()),
  offAir: () => dispatch(offAir())
});

const isEqual = (prev, next) =>
  next.artist === prev.artist &&
  next.user === prev.user &&
  next.userType === prev.userType &&
  next.authorized === prev.authorized;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Options, isEqual));
