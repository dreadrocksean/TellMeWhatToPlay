import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import DefaultContainer from "src/containers/DefaultContainer";
import UserFormWrapper from "src/services/user/UserFormWrapper";

import styles from "./styles";

const UserSignup = ({ navigation, user }) => {
  const navigateTo = artist => {
    let routeName;

    if (!user) routeName = "FanSignup";
    else if (!artist) routeName = "ArtistSignup";
    else routeName = "ArtistAdmin";
    if (!routeName) return;
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

const mapStateToProps = state => ({
  user: state.login.user
});

export default connect(mapStateToProps)(UserSignup);
