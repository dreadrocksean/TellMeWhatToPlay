import React, { useState, useEffect, memo } from "react";
import { TouchableHighlight, Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";

import styles from "./styles";

import {
  loadStoredUserArtist,
  guestTypeFan,
  guestTypeArtist
} from "src/store/actions/ActionCreator";
import DefaultContainer from "src/containers/DefaultContainer";
import AppText from "src/components/AppText";
import fanButton from "src/images/buttons/fan_btn.png";
import artistButton from "src/images/buttons/artist_btn.png";

const Home = ({
  navigation,
  authorized,
  user,
  artist,
  guestTypeFan,
  guestTypeArtist,
  loadStoredUserArtist
}) => {
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
        if (!authorized) return "UserSignup";
        if (!artistAuth) return "ArtistSignup";
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
  artist: state.login.artist,
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  loadStoredUserArtist: () => dispatch(loadStoredUserArtist()),
  guestTypeFan: () => dispatch(guestTypeFan()),
  guestTypeArtist: () => dispatch(guestTypeArtist())
});

const isEqual = (prev, next) =>
  next.artist === prev.artist &&
  next.user === prev.user &&
  next.authorized === prev.authorized;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Home, isEqual));
