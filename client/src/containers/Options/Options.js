import React, { useState, useEffect, useRef, memo } from "react";
import {
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
  Image
} from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { Button as RNButton, Icon } from "react-native-elements";

import styles from "./styles";

// import { saveStorage, loadStorage } from "src/services/LocalStorage";
import { getDocs } from "src/services/api";
import {
  loadStoredUserArtist,
  loginUser,
  loginArtist,
  logout as logoutAction,
  guestTypeFan,
  guestTypeArtist,
  onAir,
  offAir
} from "src/store/actions/ActionCreator";
import * as ActionTypes from "src/store/actions/ActionTypes";

import DefaultContainer from "src/containers/DefaultContainer";
import { updateHeader } from "src/utils/UpdateHeader";
import AppText from "src/components/AppText";
import CheckBox from "src/components/CheckBox/";
import RadioButton from "src/components/RadioButton/";

import bg from "src/images/bg.png";
import fanButton from "src/images/buttons/fan_btn.png";
import artistButton from "src/images/buttons/artist_btn.png";

const Options = ({
  navigation,
  authorized,
  userType,
  loadStoredUserArtist,
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
    const checkStoredCreds = async () => {
      try {
        await loadStoredUserArtist();
      } catch (err) {
        console.log("loadStoredUserArtist ERR", err);
      }
    };
    checkStoredCreds();
  }, []);

  const onClick = userType => async () => {
    const routeName = getRouteName(userType);
    navigation.navigate(routeName, { name: routeName });
  };

  const getRouteName = userType => {
    const artistAuth = artist && Object.keys(artist).length > 0;
    console.log("getRouteName ARTIST", artist);
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

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  userType: state.login.userType,
  artist: state.login.artist,
  user: state.login.user,
  errorMessage: state.login.errorMessage
});

const mapDispatchToProps = dispatch => ({
  loadStoredUserArtist: () => dispatch(loadStoredUserArtist()),
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
