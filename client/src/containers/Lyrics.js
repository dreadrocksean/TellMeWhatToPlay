import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";

import DefaultContainer from "./DefaultContainer";
import { updateHeader } from "src/utils/UpdateHeader";
import { fetchLyrics } from "src/services/api";
import { loadingStatus } from "src/store/actions/ActionCreator";

const Lyrics = ({ navigation, route, loadingStatus }) => {
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

  return (
    <DefaultContainer
      loading={false}
      goHome={() => navigation.navigate("Options")}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>{lyrics}</Text>
        </View>
      </ScrollView>
    </DefaultContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    fontSize: 20,
    color: "#d4d4d4"
  }
});

const mapDispatchToProps = dispatch => ({
  loadingStatus: status => dispatch(loadingStatus(status))
});

export default connect(
  null,
  mapDispatchToProps
)(Lyrics);
