import React, { useState, useEffect, Fragment } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

import DefaultContainer from "src/containers/DefaultContainer";
import AppText from "src/components/AppText";
import LyricsForm from "src/containers/LyricsForm";
import { fetchLyrics } from "src/services/api";
import { loadingStatus, addLyrics } from "src/store/actions/ActionCreator";
import editIcon from "src/images/icons/edit_btn.png";

const Lyrics = ({
  navigation,
  route,
  loadingStatus,
  authorized,
  userType,
  addLyrics
}) => {
  const [edit, setEdit] = useState(false);
  const [lyrics, setLyrics] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const { _id, title, artist, lyrics } = route.params.song;
    console.log("================SONGID, LYRICS", _id, !!lyrics);

    const getLyrics = async () => {
      loadingStatus(true);
      try {
        const data = await fetchLyrics(title, artist);
        loadingStatus(false);
        console.log("useEffect DATA", data.result.track.name);
        if (data.error)
          throw new Error(`Problem getting lyrics: ${data.error}`);

        setLyrics(data.result.track.text);
        setTitle(data.result.artist.name);
        saveLyrics(data.result.track.text);
      } catch (err) {
        loadingStatus(false);
        console.log("getLyrics ERR", err);
        loadingStatus(false);
        setLyrics(null);
      }
    };

    if (lyrics) {
      setLyrics(lyrics);
      setTitle(title);
    } else getLyrics();
  }, []);

  useEffect(() => {
    if (!authorized && userType === "Artist") navigation.replace("Home");
  }, [authorized]);

  const saveLyrics = async lyrics => {
    console.log("SAVELYRICS", !!lyrics, route.params.song._id);
    try {
      loadingStatus(true);
      const res = await addLyrics({ _id: route.params.song._id, lyrics });
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
      {title}
    </AppText>
  );

  return (
    <DefaultContainer
      headerLeft={renderHeaderLeft()}
      headerMiddle={renderHeaderMiddle()}
    >
      {!!lyrics && !edit ? (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.text}>{lyrics}</Text>
          </View>
        </ScrollView>
      ) : (
        <LyricsForm onSubmit={saveLyrics} origLyrics={lyrics} />
      )}
    </DefaultContainer>
  );
};

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  userType: state.login.userType
});

const mapDispatchToProps = dispatch => ({
  loadingStatus: status => dispatch(loadingStatus(status)),
  addLyrics: status => dispatch(addLyrics(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lyrics);
