import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import ArtistFormWrapper from "../services/artist/ArtistFormWrapper";

import DefaultContainer from "./DefaultContainer";
import AppText from "src/components/AppText";

const ArtistSignup = ({ navigation, user, artist }) => {
  // const [headingText, setHeadingText] = useState("");

  const navigateTo = () => {
    let routeName;
    if (user && !artist) routeName = "ArtistSignup";
    else if (artist) routeName = "ArtistAdmin";
    if (!routeName) return;
    navigation.navigate(routeName /*, { name: routeName }*/);
  };

  return <ArtistFormWrapper navigation={navigation} />;
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  user: state.login.user,
  artist: state.login.artist
});

export default connect(mapStateToProps)(ArtistSignup);
