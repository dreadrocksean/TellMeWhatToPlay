import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

import submitButton from "src/images/buttons/post_lyrics_btn.png";
import { loadingStatus, addLyrics } from "src/store/actions/ActionCreator";

const placeholder = "Enter lyrics here.";

const LyricsForm = ({
  navigation,
  route,
  loadingStatus,
  authorized,
  userType,
  onSubmit,
  origLyrics
}) => {
  const [lyrics, setLyrics] = useState(null);

  useEffect(() => {
    setLyrics(origLyrics);
  }, []);

  useEffect(() => {
    if (!authorized && userType === "Artist") navigation.replace("Home");
  }, [authorized]);

  const handleOnSubmit = () => onSubmit(lyrics);

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
      <TouchableOpacity style={styles.buttonContainer} onPress={handleOnSubmit}>
        <Image style={styles.image} source={submitButton} />
      </TouchableOpacity>
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
