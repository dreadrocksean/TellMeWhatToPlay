import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  Platform,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./styles";

import ArtistDropdown from "./ArtistDropdown";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import CheckBox from "src/components/CheckBox";
import FormError from "src/components/FormError";
import addSongButton from "src/images/buttons/add_song_btn2.png";

import {
  fetchLastFMSong,
  createSong,
  createDoc,
  updateDoc,
  getDocs
} from "src/services/api";
import { saveStorage } from "src/services/LocalStorage";
import { width, height } from "src/utils/General";

const init = {
  formattedTitle: { invisible: "", visible: "" },
  formattedArtist: { invisible: "", visible: "" },
  songs: [],
  song: {},
  errorMessage: null
};

const AddSong = ({ hideModal, userArtistId, setlist, complete }) => {
  const [errorMessage, setErrorMessage] = useState(init.errorMessage);
  const [formattedTitle, setFormattedTitle] = useState(init.formattedTitle);
  const [formattedArtist, setFormattedArtist] = useState(init.formattedArtist);

  const _isMountedRef = useRef(false);
  const allSongsRef = useRef([]);
  const titleRef = useRef("");
  const artistRef = useRef("");

  useEffect(() => {
    _isMountedRef.current = true;
    return () => (_isMountedRef.current = false);
  }, []);

  const [songs, setSongs] = useState(init.songs);
  const [song, setSong] = useState(init.song);

  useEffect(() => {
    const formattedTitle = getFormattedStr(titleRef.current, song.title);
    const formattedArtist = getFormattedStr(artistRef.current, song.artist);
    updateState({ formattedTitle, formattedArtist });
    filterByArtist();
  }, [song.title, song.artist, titleRef.current, artistRef.current]);

  const [asIs, setAsIs] = useState(false);
  useEffect(() => {
    handleChange("title")(titleRef.current);
  }, [asIs]);

  const reset = () => {
    allSongsRef.current = [];
    updateState({
      formattedTitle: init.formattedTitle,
      formattedArtist: init.formattedArtist,
      songs: init.songs,
      song: init.song
    });
  };

  const hide = () => {
    reset();
    hideModal(false);
  };

  const updateState = ({ formattedTitle, formattedArtist, songs, song }) => {
    if (!_isMountedRef.current) return;
    if (typeof formattedTitle !== "undefined")
      setFormattedTitle(formattedTitle);
    if (typeof formattedArtist !== "undefined")
      setFormattedArtist(formattedArtist);
    if (typeof songs !== "undefined") setSongs([...songs]);
    if (typeof song !== "undefined") setSong(song);
  };

  const getFormattedStr = (str = "", strComplete = "") => {
    const strFormatted = {};
    const pos = strComplete.toLowerCase().indexOf(str.toLowerCase());
    if (pos > -1 && strComplete) {
      const l = str.length;
      strFormatted.invisible = strComplete.substr(0, pos);
      strFormatted.visible = strComplete.substr(pos, l);
    } else {
      strFormatted.invisible = "";
      strFormatted.visible = str;
    }
    return strFormatted;
  };

  const filterByArtist = val => {
    artistRef.current = typeof val !== "undefined" ? val : artistRef.current;
    const filteredSongs = (allSongsRef.current || []).filter(v =>
      v.artist.toLowerCase().includes(artistRef.current.toLowerCase())
    );
    updateState({ songs: filteredSongs, song: filteredSongs[0] });
  };

  const handleChange = field => async (value = "") => {
    updateState({ errorMessage: null });
    if (field === "title") {
      titleRef.current = value;
      if (titleRef.current.trim().length < 3 || asIs) {
        reset();
        return;
      }
      try {
        const res = await fetchSongSuggestionList({ [field]: value });
        allSongsRef.current = res;
        const bestSong =
          allSongsRef.current.find(v =>
            v.title.toLowerCase().includes(titleRef.current.toLowerCase())
          ) ||
          songs[0] ||
          init.song;
        updateState({ songs: allSongsRef.current, song: bestSong });
      } catch (err) {}
    } else filterByArtist(value);
  };

  const fetchSongSuggestionList = async payload => {
    const key = Object.keys(payload)[0];
    const title = key === "title" ? payload[key] : "";
    const artist = key === "artist" ? payload[key] : "";
    try {
      const data = await fetchLastFMSong(title, artist);
      const track = data.results ? data.results.trackmatches.track : [];
      const formattedTracks = track.map((v, i) => ({
        title: v.name,
        artist: v.artist,
        mbid: v.mbid,
        key: i
      }));
      return Promise.resolve(formattedTracks);
    } catch (err) {
      console.log("ERR", err);
      return Promise.reject(err);
    }
  };

  const findSong = async data => {
    try {
      const res = await getDocs("song", data);
      return Promise.resolve(res.data);
    } catch (err) {
      console.log("ERR", err);
      return Promise.reject(err);
    }
  };

  const addSong = async () => {
    if (!asIs && (!song || !song.title || !song.artist)) {
      updateState({ errorMessage: "Fields cannot be empty" });
      return;
    }
    const data = {
      title: (asIs ? titleRef.current : song.title).trim(),
      artist: (asIs ? artistRef.current : song.artist).trim(),
      mbid: asIs ? null : song.mbid.trim()
    };
    try {
      const found = await findSong(data);
      const foundId = found ? found._id : null;
      const artistSongExists =
        !!foundId && setlist.find(v => v._id === foundId);
      if (artistSongExists) throw new Error("Song already exists in setlist.");

      let res;
      if (!foundId) {
        res = await createDoc("song", data);
        if (!res.success) throw new Error("Could not create new song");
      }
      await updateDoc("artist", {
        _id: userArtistId,
        songs: [
          ...setlist,
          {
            _id: foundId || res.data._id,
            votes: 0,
            currVotes: 0,
            visible: false
          }
        ]
      });
    } catch (err) {
      console.log(err);
    }
    console.log("about to COMPLETE");
    complete();
    reset();
    hide();
  };

  const onDropdownPress = song => updateState({ song });

  const onAsIs = () => setAsIs(!asIs);

  const renderAction = () => (
    <TouchableOpacity style={styles.submitButton} onPress={addSong}>
      <Image style={styles.image} source={addSongButton} />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, alignSelf: "stretch" }}
    >
      <AppText style={styles.title}>ADD NEW SONG</AppText>
      <CheckBox
        style={styles.asis}
        labelStyle={styles.asIsLabel}
        checkBoxStyle={styles.asIsCheckBox}
        onPress={onAsIs}
        checked={asIs}
        label={asIs ? "As Is" : "Lookup"}
      />
      {errorMessage && <FormError>{errorMessage}</FormError>}
      <View style={styles.inputContainer}>
        <AppTextInput
          style={{ ...styles.input, ...styles.autocomplete }}
          textStyle={styles.inputText}
          placeholder={song.title || ""}
          editable={false}
        />
        <AppTextInput
          style={styles.input}
          textStyle={styles.inputText}
          placeholder={song.title ? "" : "Title"}
          onChangeText={handleChange("title")}
          formattedValue={formattedTitle}
        />
      </View>
      <View style={styles.inputContainer}>
        <AppTextInput
          style={{ ...styles.input, ...styles.autocomplete }}
          textStyle={styles.inputText}
          placeholder={song.artist || ""}
          editable={false}
        />
        <AppTextInput
          style={styles.input}
          textStyle={styles.inputText}
          placeholder={song.artist ? "" : "Artist"}
          onChangeText={handleChange("artist")}
          formattedValue={formattedArtist}
        />
        <ArtistDropdown
          style={styles.dropdown}
          data={songs}
          action={renderAction()}
          onPress={onDropdownPress}
        />
      </View>
      <View style={styles.buttonWrapper}>{renderAction()}</View>
    </KeyboardAvoidingView>
  );
};

export default AddSong;
