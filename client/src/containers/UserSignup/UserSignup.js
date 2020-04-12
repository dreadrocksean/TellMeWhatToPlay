import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import DefaultContainer from "src/containers/DefaultContainer";
import UserFormWrapper from "src/services/user/UserFormWrapper";
import { UserType } from "src/store/reducers/LoginReducer";

import styles from "./styles";

const UserSignup = ({ navigation, userType }) => {
  const navigateTo = (user, artist) => {
    let routeName;
    if (!user) return; //set sture message here
    if (userType === UserType.ARTIST) {
      if (artist) routeName = "ArtistAdmin";
      else routeName = "ArtistSignup";
    }
    if (!routeName) return;
    navigation.replace(routeName);
  };

  return <UserFormWrapper navigateTo={navigateTo} />;
};

const mapStateToProps = state => ({
  userType: state.login.userType
});

export default connect(mapStateToProps)(UserSignup);
