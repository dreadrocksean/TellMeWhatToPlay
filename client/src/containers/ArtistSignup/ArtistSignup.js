import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

import ArtistFormWrapper from "src/services/artist/ArtistFormWrapper";
import DefaultContainer from "src/containers/DefaultContainer";
import AppText from "src/components/AppText";

const ArtistSignup = ({ navigation, user, artist, authorized }) => {
  useEffect(() => {
    if (!authorized) navigation.replace("Home");
  }, [authorized]);

  const navigateTo = artist => {
    let routeName;
    if (user && !artist) routeName = "ArtistSignup";
    else if (artist) routeName = "ArtistAdmin";
    if (!routeName) return;
    navigation.navigate(routeName /*, { name: routeName }*/);
  };

  return <ArtistFormWrapper navigation={navigation} navigateTo={navigateTo} />;
};

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  user: state.login.user,
  artist: state.artist
});

export default connect(mapStateToProps)(ArtistSignup);
