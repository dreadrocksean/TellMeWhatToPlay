import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Image } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

import submitButton from "src/images/buttons/post_lyrics_btn.png";
import { loadingStatus } from "src/store/actions/ActionCreator";

const placeholder = "Enter lyrics here.";

const LyricsForm = ({
  navigation,
  route,
  loadingStatus,
  authorized,
  userType
}) => {
  const [message, setMessage] = useState("Sorry. No lyrics available :-(");
  const [lyrics, setLyrics] = useState(null);

  useEffect(() => {
    if (!authorized && userType === "Artist") navigation.replace("Home");
  }, [authorized]);

  return (
    <View style={styles.root}>
      <Text style={styles.headerText}>Create your own lyrics</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.text}
          placeholder={placeholder}
          multiline
          textAlignVertical="top"
          value={lyrics}
          onChangeText={setLyrics}
          placeholderTextColor="white"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Image style={styles.image} source={submitButton} />
      </View>
    </View>
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
)(LyricsForm);
