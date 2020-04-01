import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import DefaultContainer from "src/containers/DefaultContainer";
import UserFormWrapper from "src/services/user/UserFormWrapper";
// import { guestTypeArtist } from "src/store/actions/ActionCreator";

import styles from "./styles";

const UserSignup = ({ navigation, user }) => {
  const navigateTo = artist => {
    let routeName;

    if (!user) routeName = "FanSignup";
    else if (!artist) routeName = "ArtistSignup";
    else routeName = "ArtistAdmin";
    if (!routeName) return;
    console.log("NAVIGATION", navigation);
    navigation.replace(routeName);
  };

  const renderHeaderChildren = () => (
    <View>
      <Text style={styles.h1}>ACCOUNT</Text>
    </View>
  );

  return (
    <DefaultContainer
      style={styles.body}
      headerChildren={renderHeaderChildren()}
    >
      <UserFormWrapper navigation={navigation} navigateTo={navigateTo} />
    </DefaultContainer>
  );
};

const mapStateToProps = state => {
  return {
    user: state.login.user
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     guestTypeArtist: dispatch(guestTypeArtist())
//   };
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(UserSignup);
