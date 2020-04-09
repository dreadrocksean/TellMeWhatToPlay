import React, { useState, useEffect, Fragment } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

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
  // const [lyrics, setLyrics] = useState(null);
  // const [title, setTitle] = useState(null);

  useEffect(() => {
    if (!currSong) return;
    const { _id, title, artist, lyrics } = currSong;
    console.log("================SONGID, LYRICS", _id, !!lyrics);

    const getLyrics = async () => {
      loadingStatus(true);
      try {
        const data = await fetchLyrics(title, artist);
        loadingStatus(false);
        console.log("useEffect DATA", data.result.track.name);
        if (data.error)
          throw new Error(`Problem getting lyrics: ${data.error}`);
        currSong.lyrics = data.result.track.text;
        saveLyrics(currSong.lyrics);
        updateCurrSong(currSong);
      } catch (err) {
        loadingStatus(false);
        console.log("getLyrics ERR", err);
        currSong.lyrics = null;
        updateCurrSong(currSong);
        // setLyrics(null);
      }
    };

    if (lyrics) {
      // setLyrics(lyrics);
      // setTitle(title);
    } else getLyrics();
  }, []);

  useEffect(() => {
    if (!authorized && userType === "Artist") navigation.replace("Home");
  }, [authorized]);

  const saveLyrics = async lyrics => {
    console.log("SAVELYRICS", !!lyrics, currSong._id);
    try {
      loadingStatus(true);
      currSong.lyrics = lyrics;
      updateCurrSong(currSong);
      const res = await addLyrics({
        _id: currSong._id,
        lyrics: currSong.lyrics
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
  console.log("CURRSONG has lyrics", !!currSong.lyrics);
  return (
    <DefaultContainer
      headerLeft={renderHeaderLeft()}
      headerMiddle={renderHeaderMiddle()}
    >
      {!edit ? (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.text}>{currSong.lyrics || apology}</Text>
          </View>
        </ScrollView>
      ) : (
        <LyricsForm onSubmit={saveLyrics} origLyrics={currSong.lyrics} />
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
