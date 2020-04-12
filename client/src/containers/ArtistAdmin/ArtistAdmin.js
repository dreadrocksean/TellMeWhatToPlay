import React, { useState, useEffect, useRef, Fragment } from "react";
import { connect } from "react-redux";
import {
  Platform,
  Text,
  Button,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { Constants, Camera, FileSystem } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { Button as RNButton, Icon } from "react-native-elements";

import {
  onAir as onAirActionType,
  offAir as offAirActionType,
  logout as logoutActionType,
  deleteArtist
} from "src/store/actions/ActionCreator";
import { updateDoc, updateLocation } from "src/services/api";

import listItemAvatar from "src/images/test_avatar.png";

import styles from "./styles";

import DefaultContainer from "src/containers/DefaultContainer";
import AppText from "src/components/AppText";
import RoundImage from "src/components/RoundImage";
import { scale, verticalScale, moderateScale } from "src/utils/Scales";
import cloudinaryConfig from "src/utils/Cloudinary";

import onAirButton from "src/images/buttons/onair_btn.png";
import offAirButton from "src/images/buttons/offair_btn.png";
import editIcon from "src/images/icons/edit_btn.png";
import manageSetlistButton from "src/images/buttons/manage_btn.png";
import logoutButton from "src/images/buttons/logout_btn.png";

const ArtistAdmin = ({
  navigation,
  authorized,
  artist,
  logout,
  onAir,
  offAir,
  deleteArtist
}) => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [edit_email, setEdit_email] = useState("");
  const [edit_password, setEdit_password] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const locationRef = useRef(null);
  const _isMounted = useRef(false);

  useEffect(() => {
    _isMounted.current = true;
    _getLocationAsync();
    if (!showModal && !authorized) navigation.goBack();

    return () => {
      _isMounted.current = false;
      locationRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (!authorized) navigation.replace("Home");
  }, [authorized]);

  useEffect(() => {
    if (!artist) navigation.replace("ArtistSignup");
  }, [artist]);

  const editAdmin = () =>
    navigation.navigate("ArtistSignup", { name: "ArtistSignup" });

  const _getLocationAsync = async () => {
    try {
      if (Platform.OS === "android" && !Constants.isDevice) {
        throw new Error(
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
        );
      }
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }

      locationRef.current = await Location.watchPositionAsync(
        { distanceInterval: 10 },
        async ({ coords = {} }) => {
          await updateLocation({
            location: {
              lat: coords.latitude,
              lng: coords.longitude
            },
            _id: artist._id
          });
        }
      );
    } catch (err) {
      if (!_isMounted.current) return;
      setErrorMessage(err.message);
      console.err(err.message);
    }
  };

  const handleNavigate = pageName => () => {
    navigation.navigate(pageName, {
      name: pageName,
      artist: artist
    });
  };

  const handleLogout = () => {
    logout();
  };

  const handleArtistDelete = () => {
    console.log("HANDLEARTISTDELETE", artist._id);
    deleteArtist(artist._id);
  };

  const toggleOnAir = async () => {
    try {
      if (!artist) throw new Error("Artist not valid");

      const res = await updateDoc("artist", {
        _id: artist._id,
        live: !artist.live
      });
      if (res.error) {
        throw new Error("Error toggling on air: ", res.error);
      }
      const newArtist = { ...artist, ...res.data };
      if (newArtist.live) onAir();
      else offAir();
    } catch (err) {
      if (!_isMounted.current) return;
      setErrorMessage(res.message);
    }
  };

  const renderOnAirImage = () => {
    const source = (artist || {}).live ? onAirButton : offAirButton;
    return <Image style={styles.image} source={source} />;
  };

  const renderHeaderLeft = () => (
    <TouchableOpacity onPress={editAdmin}>
      <Image style={styles.icon} source={editIcon} resizeMode={"cover"} />
    </TouchableOpacity>
  );

  const renderHeaderMiddle = () => (
    <Text style={styles.headingText}>ARTIST</Text>
  );

  return !authorized || !artist
    ? null
    : artist && (
        <DefaultContainer
          headerLeft={renderHeaderLeft()}
          headerMiddle={renderHeaderMiddle()}
          navigation={navigation}
        >
          <View style={styles.container}>
            {!!errorMessage && (
              <AppText textStyle={styles.error}>{errorMessage}</AppText>
            )}
            <View style={styles.top}>
              {
                <View style={styles.topTop}>
                  <RoundImage
                    source={{
                      uri: artist.imageURL || cloudinaryConfig.userUrl
                    }}
                    style={styles.profileImage}
                    size={150}
                  />
                </View>
              }
              <View style={styles.topMiddle}>
                <AppText textStyle={styles.title}>{artist.name}</AppText>
              </View>
              <TouchableOpacity style={styles.topBottom} onPress={toggleOnAir}>
                {renderOnAirImage()}
              </TouchableOpacity>
            </View>
            <View style={styles.middle}>
              <View style={styles.info}>
                <View style={styles.mainBox}>
                  <AppText textStyle={styles.h2}>Genre</AppText>
                  <AppText textStyle={styles.h3}>{artist.genre}</AppText>
                </View>
                <View style={styles.mainBox}>
                  <AppText textStyle={styles.h2}>Roles</AppText>
                  <AppText textStyle={styles.h3}>
                    {(artist.roles || []).join(" | ")}
                  </AppText>
                </View>
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleNavigate("SetList")}
              >
                <Image
                  style={styles.image}
                  source={manageSetlistButton}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Image
                  style={styles.image}
                  source={logoutButton}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {/*<Button onPress={handleArtistDelete} title="Delete" />*/}
            </View>
          </View>
        </DefaultContainer>
      );
};

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  artist: state.artist
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutActionType()),
  onAir: () => dispatch(onAirActionType()),
  offAir: () => dispatch(offAirActionType()),
  deleteArtist: id => dispatch(deleteArtist(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistAdmin);
