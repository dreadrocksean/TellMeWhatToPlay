import React, { useState, useRef, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  Switch,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { Constants, Camera, FileSystem } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { Button as RNButton, Icon } from "react-native-elements";

import {
  onAir,
  offAir,
  loginArtist,
  logout
} from "src/store/actions/ActionCreator";
import { updateDoc } from "src/services/api";
// import { Provider, Subscribe, Container } from 'unstated';

import listItemAvatar from "src/images/test_avatar.png";

import { styles } from "./styles";

import DefaultContainer from "src/containers/DefaultContainer";
import AppText from "src/components/AppText";
import RoundImage from "src/components/RoundImage";
// import { updateHeader } from "src/utils/UpdateHeader";
import { scale, verticalScale, moderateScale } from "src/utils/Scales";
import cloudinaryConfig from "src/utils/Cloudinary";

import onAirButton from "src/images/buttons/onair_btn.png";
import offAirButton from "src/images/buttons/offair_btn.png";
import editIcon from "src/images/icons/edit_btn.png";
import manageSetlistButton from "src/images/buttons/manage_btn.png";
import logoutButton from "src/images/buttons/logout_btn.png";

const ArtistAdmin = ({
  navigation,
  artist,
  // showModal,
  authorized,
  offAir,
  onAir,
  loginArtist,
  logout
}) => {
  const [onAir, setOnAir] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [edit_email, setEdit_email] = useState("");
  const [edit_password, setEdit_password] = useState("");
  const [location, setLocation] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const locationRef = useRef(null);
  const _isMountedRef = useRef(false);

  useEffect(() => {
    const onMount = async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMessage(
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
        );
      } else _getLocationAsync();

      // await updateDoc("artist", {
      //   _id: artist._id
      // });

      if (!showModal && !authorized) navigation.goBack();
    };
    onMount();
    _isMountedRef.current = true;
    return () => {
      _isMountedRef.current = false;
      locationRef.current.remove();
    };
  }, []);

  const editAdmin = () =>
    navigation.navigate("ArtistSignup", { title: "Edit Account" });

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
    }

    locationRef.current = await Location.watchPositionAsync(
      { distanceInterval: 10 },
      async ({ coords = {} }) => {
        const res = await updateDoc("artist", {
          location: {
            lat: coords.latitude,
            lng: coords.longitude
          },
          _id: artist._id
        });
        setLocation({ ...res.data.location, err: res.error });
      }
    );
  };

  const navigate = pageName => () => {
    navigation.navigate(pageName, {
      name: pageName,
      artist: artist
    });
  };

  const logout = () => {
    navigate("Options")();
  };

  const toggleOnAir = async () => {
    if (!artist) return;
    // If switching to on from (currently off)
    if (!artist.live && !location) {
    }
    const res = await updateDoc("artist", {
      _id: artist._id,
      live: !artist.live
    });
    if (res.error) {
      console.log("Error: ", res.error);
    }
    const newArtist = { ...artist, ...res.data };
    // dispatch(loginArtist(res.data));
    if (newArtist.live) onAir();
    else offAir();
    setErrorMessage(res.error);
  };

  const handleError = (err, msg) => {
    logout();
    setShowModal(true);
    setErrorMessage(msg);
  };

  const renderOnAirImage = () => {
    const { artist } = this.props;
    const source = (artist || {}).live ? onAirButton : offAirButton;
    return <Image style={[styles.button, { height: 50 }]} source={source} />;
  };

  const renderHeaderChildren = () => {
    return (
      <Fragment>
        <TouchableOpacity onPress={this.editAdmin}>
          <Image style={styles.icon} source={editIcon} resizeMode={"cover"} />
        </TouchableOpacity>
        <Text style={styles.headingText}>ARTIST</Text>
      </Fragment>
    );
  };

  return !authorized || !artist
    ? null
    : artist && (
        <DefaultContainer
          loading={this.state.loading}
          headerChildren={this.renderHeaderChildren()}
          navigation={this.props.navigation}
        >
          <View style={styles.container}>
            {errorMessage && (
              <AppText textStyle={styles.error}>{errorMessage}</AppText>
            )}
            <View style={styles.top}>
              <RoundImage
                source={{
                  uri: artist.imageURL || cloudinaryConfig.userUrl
                }}
                style={{
                  size: 150,
                  borderColor: "#ffd72b",
                  borderWidth: 4
                }}
              />
              <AppText textStyle={styles.title}>{artist.name}</AppText>
              <View>
                <TouchableOpacity onPress={this.toggleOnAir}>
                  {this.renderOnAirImage()}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.middle}>
              <View style={styles.mainBox}>
                <AppText textStyle={styles.h2}>Genre</AppText>
                <AppText textStyle={styles.h3}>{artist.genre}</AppText>
              </View>
              <View style={styles.mainBox}>
                <AppText textStyle={styles.h2}>Roles</AppText>
                <AppText textStyle={styles.h3}>
                  {artist.roles.join(" | ")}
                </AppText>
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={this.navigate("SetList")}>
                <Image
                  style={[styles.button, { height: 68 }]}
                  source={manageSetlistButton}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.logout}>
                <Image
                  style={[styles.button, { height: 55 }]}
                  source={logoutButton}
                />
              </TouchableOpacity>
            </View>
          </View>
        </DefaultContainer>
      );
};

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  artist: state.artist
  // showModal: state.login.showModal
});

const mapDispatchToProps = dispatch => ({
  loginArtist: data => {
    dispatch(loginArtist(data));
  },
  logout: () => dispatch(logout()),
  onAir: () => dispatch(onAir()),
  offAir: () => dispatch(offAir())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistAdmin);
