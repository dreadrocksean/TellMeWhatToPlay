import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

import DefaultContainer from "src/containers/DefaultContainer";
import { updateHeader } from "src/utils/UpdateHeader";
import { fetchLyrics } from "src/services/api";
import { loadingStatus } from "src/store/actions/ActionCreator";

const Lyrics = ({ navigation, route, loadingStatus, authorized, userType }) => {
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    const getLyrics = async () => {
      try {
        const { title, artist } = route.params;
        const data = await fetchLyrics(title, artist);
        loadingStatus(false);
        setLyrics(data.result.track.text);
      } catch (err) {
        loadingStatus(false);
        setLyrics("Sorry. No lyrics available :-(");
      }
    };
    loadingStatus(true);
    getLyrics();
  }, []);

  useEffect(() => {
    if (!authorized && userType === "Artist") navigation.replace("Home");
  }, [authorized]);

  return (
    <DefaultContainer>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>{lyrics}</Text>
        </View>
      </ScrollView>
    </DefaultContainer>
  );
};

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  userType: state.login.userType
});

const mapDispatchToProps = dispatch => ({
  loadingStatus: status => dispatch(loadingStatus(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lyrics);
