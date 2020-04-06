import React, { useState, useEffect, memo } from "react";
import { TouchableHighlight, Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";

import styles from "./styles";

import { UserType } from "src/store/reducers/LoginReducer";
import {
  loadStoredUserArtist,
  guestTypeFan,
  guestTypeArtist,
  guestTypeNone
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
  guestTypeNone,
  loadStoredUserArtist
}) => {
  useEffect(() => {
    console.log("MOUNTED");
    const checkStoredCreds = async () => {
      try {
        await loadStoredUserArtist();
      } catch (err) {
        console.log("loadStoredUserArtist ERR", err);
      }
    };
    checkStoredCreds();
    // guestTypeNone();
  }, [loadStoredUserArtist]);

  const onClick = type => async () => {
    console.log("CLICKED", type);
    switch (type) {
      case "ARTIST":
        guestTypeArtist();
        break;
      case "FAN":
        guestTypeFan();
        break;
      default:
        return null;
    }
    const routeName = getRouteName(type);
    console.log("ROUTENAME", routeName);
    if (routeName) navigation.navigate(routeName);
  };

  const getRouteName = type => {
    console.log("USER, ARTIST", user, artist);
    switch (type) {
      case "ARTIST": {
        if (!user) return "UserSignup";
        if (!artist) return "ArtistSignup";
        return "ArtistAdmin";
      }
      case "FAN": {
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
  artist: state.artist,
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  loadStoredUserArtist: () => dispatch(loadStoredUserArtist()),
  guestTypeFan: () => dispatch(guestTypeFan()),
  guestTypeArtist: () => dispatch(guestTypeArtist()),
  guestTypeNone: () => dispatch(guestTypeNone())
});

const isEqual = (prev, next) =>
  next.artist === prev.artist && next.authorized === prev.authorized;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
