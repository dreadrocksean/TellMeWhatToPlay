import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import DefaultContainer from "./DefaultContainer";
import UserFormWrapper from "../services/user/UserFormWrapper";
import { guestTypeArtist } from "../redux/actions/ActionCreator";

class UserSignup extends Component {
  componentDidMount() {
    guestTypeArtist();
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate userType', this.props.userType);
    // this.navigateTo();
  }

  navigateTo = () => {
    const { user, artist } = this.props;
    let routeName;
    // console.log('navigateTo', user, artist);

    if (!user) {
      routeName = "FanSignup";
    } else if (user && !artist) {
      routeName = "ArtistSignup";
    } else if (user && artist) {
      routeName = "ArtistAdmin";
    }
    if (!routeName) {
      return;
    }
    this.props.navigation.replace(routeName, { name: routeName });
  };

  renderHeaderChildren() {
    return (
      <View>
        <Text style={styles.h1}>CREATE ACCOUNT</Text>
      </View>
    );
  }

  render() {
    // console.log('render userType', this.props.userType);
    return (
      <DefaultContainer
        style={styles.body}
        headerChildren={this.renderHeaderChildren()}
      >
        <UserFormWrapper navigateTo={this.navigateTo} />
      </DefaultContainer>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center"
  },
  h1: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "left"
  }
});

const mapStateToProps = state => {
  // console.log('mapStateToProps state', state);
  return {
    user: state.login.user,
    artist: state.login.artist,
    userType: state.login.userType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    guestTypeArtist: dispatch(guestTypeArtist())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSignup);
