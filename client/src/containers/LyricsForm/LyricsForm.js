import React, { useState, useEffect, Fragment } from "react";
import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

import AppText from "src/components/AppText";
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
  song
}) => {
  const [lyrics, setLyrics] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setLyrics(song?.lyrics);
    setImage(song?.image);
  }, []);

  useEffect(() => {
    if (!authorized && userType === "Artist") navigation.replace("Home");
  }, [authorized]);

  const headerText = lyrics ? "Edit lyrics" : "Create your own lyrics";

  const handleOnSubmit = () => onSubmit(lyrics);

  return (
    <Fragment>
      <Text style={styles.headerText}>{headerText}</Text>
      {/* { image && <Image source={require(image)} />} */}
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
    </Fragment>
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
