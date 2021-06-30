import React, { useState, useEffect, Fragment } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import styles from "./styles";

import DefaultContainer from "src/containers/DefaultContainer";
import AppText from "src/components/AppText";
import LyricsForm from "src/containers/LyricsForm";
import { fetchLyrics } from "src/services/api";
import {
  loadingStatus,
  addLyrics,
  updateCurrSong
} from "src/store/actions/ActionCreator";
import editIcon from "src/images/icons/edit_btn.png";

const apology = "Sorry, no lyrics available.";
const suggestion = "Feel free to add lyrics with the edit button.";

const Lyrics = ({
  navigation,
  route,
  loadingStatus,
  authorized,
  userType,
  addLyrics,
  updateCurrSong,
  currSong
}) => {
  const [edit, setEdit] = useState(false);
  // const [image, setImage] = useState(null);
  // const [lyrics, setLyrics] = useState(null);
  // const [title, setTitle] = useState(null);

  useEffect(() => {
    if (!currSong) return;
    const { _id, title, artist, lyrics } = currSong;

    const getLyrics = async () => {
      loadingStatus(true);
      try {
        const {lyrics, albumArt  = null} = await fetchLyrics(title, artist);
        loadingStatus(false);
        // currSong.lyrics = lyrics;
        currSong.image = albumArt;
        console.log("TCL: getLyrics -> currSong", currSong)
        saveLyrics(lyrics);
      } catch (err) {
        loadingStatus(false);
        console.log("getLyrics ERR", err);
        currSong.lyrics = null;
        currSong.image = null;
        updateCurrSong(currSong);
        // setLyrics(null);
      }
    };

    if (!lyrics) getLyrics();
  }, []);

  useEffect(() => {
    if (!authorized && userType === "Artist") navigation.replace("Home");
  }, [authorized]);

  const saveLyrics = async lyrics => {
    try {
      loadingStatus(true);
      currSong.lyrics = lyrics;
      updateCurrSong(currSong);
      const res = await addLyrics({
        _id: currSong._id,
        lyrics: currSong.lyrics,
        image: currSong.image
      });
      setEdit(false);
      loadingStatus(false);
    } catch (err) {
      loadingStatus(false);
      console.log("Lyrics saveLyrics ERR", err);
    }
  };

  const editLyrics = () => setEdit(!edit);

  const renderHeaderLeft = () => (
    <TouchableOpacity style={styles.iconWrapper} onPress={editLyrics}>
      <Image style={styles.icon} source={editIcon} resizeMode={"cover"} />
    </TouchableOpacity>
  );

  const renderHeaderMiddle = () => (
    <AppText numberOfLines={2} textStyle={styles.title}>
      {currSong.title}
    </AppText>
  );

  console.log("currSong: ", currSong)
  // const icon = currSong?.image ? require(currSong.image) : null;

  return (
    <DefaultContainer
      headerLeft={renderHeaderLeft()}
      headerMiddle={renderHeaderMiddle()}
    >
      {!edit ? (
        <ScrollView>
          <View style={styles.container}>
            {currSong.lyrics ? (
              <>
                {currSong.image && <Image style={styles.image} source={{uri: currSong.image}} />}
                <Text style={styles.text}>{currSong.lyrics}</Text>
              </>
            ) : (
              <>
                <Text style={styles.text}>{apology}</Text>
                <Text style={styles.textSuggestion}>{suggestion}</Text>
              </>
            )}
          </View>
        </ScrollView>
      ) : (
        <KeyboardAwareScrollView>
          <LyricsForm onSubmit={saveLyrics} song={currSong} />
        </KeyboardAwareScrollView>
      )}
    </DefaultContainer>
  );
};

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  userType: state.login.userType,
  currSong: state.song.currSong || {}
});

const mapDispatchToProps = dispatch => ({
  loadingStatus: status => dispatch(loadingStatus(status)),
  addLyrics: status => dispatch(addLyrics(status)),
  updateCurrSong: song => dispatch(updateCurrSong(song))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lyrics);
