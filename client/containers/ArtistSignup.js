import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import ArtistFormWrapper from "../services/artist/ArtistFormWrapper";

import DefaultContainer from "./DefaultContainer";
import AppText from "../components/AppText";

class ArtistSignup extends Component {
  state = {
    headingText: ""
  };

  navigateTo() {
    const { user, artist } = this.props;
    let routeName;
    if (user && !artist) {
      routeName = "ArtistSignup";
      // this.setState({headingText: 'ARTIST PROFILE'})
    }
    if (user && artist) {
      routeName = "ArtistAdmin";
      // this.setState({headingText: ' ARTIST ADMIN'})
    }
    if (!routeName) {
      return;
    }
    this.props.navigation.navigate(routeName, { name: routeName });
  }

  render() {
    return <ArtistFormWrapper navigation={this.props.navigation} />;
  }
}

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
