import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";

import styles from "./styles";
import ArtistDropdown from "./ArtistDropdown";
import Modal from "src/components/Modal";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import FormError from "src/components/FormError";
import addSongButton from "src/images/buttons/add_song_btn2.png";

import {
  fetchLastFMSong,
  createSong,
  createDoc,
  updateDoc
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

const AddSong = ({
  setShowModal,
  showModal,
  userArtistId,
  setlist,
  complete
}) => {
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
  }, [song.title, song.artist, titleRef.current, artistRef.current]);

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
    setShowModal(false);
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

  const getFormattedStr = (str, strComplete) => {
    const strFormatted = {};
    const pos = (strComplete || "").toLowerCase().indexOf(str.toLowerCase());
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

  const handleChange = field => async value => {
    updateState({ errorMessage: null });
    if (field === "title") {
      titleRef.current = value;
      if (titleRef.current.trim().length < 3) {
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
    } else {
      artistRef.current = value;
      const filteredSongs = (allSongsRef.current || []).filter(v =>
        v.artist.toLowerCase().includes(value.toLowerCase())
      );
      updateState({ songs: filteredSongs, song: filteredSongs[0] });
    }
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

  const addSong = async () => {
    if (!song || !song.title || !song.artist) {
      updateState({ errorMessage: "Fields cannot be empty" });
      return;
    }
    const data = {
      title: song.title.trim(),
      artist: song.artist.trim(),
      mbid: song.mbid.trim()
    };
    const res = await createDoc("song", data);
    if (res.success) {
      const data = res.data;
      await updateDoc("artist", {
        _id: userArtistId,
        songs: [
          ...setlist,
          { _id: data._id, votes: 0, currVotes: 0, visible: false }
        ]
      });
    }
    console.log("about to COMPLETE");
    complete();
    reset();
    hide();
  };

  const onDropdownPress = song => {
    updateState({ song });
  };

  const renderAction = () => (
    <TouchableOpacity
      style={{ width: "100%", height: 50, marginTop: 10 }}
      onPress={addSong}
    >
      <Image style={styles.image} source={addSongButton} />
    </TouchableOpacity>
  );

  return showModal ? (
    <Modal dismiss={hide}>
      <AppText
        style={{ flex: 1 }}
        textStyle={{ fontFamily: "montserrat-regular" }}
      >
        ADD NEW SONG
      </AppText>
      {errorMessage && <FormError>{errorMessage}</FormError>}
      <View style={styles.inputContainer}>
        <AppTextInput
          style={styles.autocomplete}
          placeholder={song.title || ""}
          editable={false}
        />
        <AppTextInput
          style={styles.input}
          placeholder={song.title ? "" : "Title"}
          onChangeText={handleChange("title")}
          formattedValue={formattedTitle}
        />
      </View>
      <View style={styles.inputContainer}>
        <AppTextInput
          style={styles.autocomplete}
          placeholder={song.artist || ""}
          editable={false}
        />
        <AppTextInput
          style={styles.input}
          placeholder={song.artist ? "" : "Artist"}
          onChangeText={handleChange("artist")}
          formattedValue={formattedArtist}
        />
        <ArtistDropdown
          data={songs}
          action={renderAction()}
          onPress={onDropdownPress}
        />
      </View>
      {renderAction()}
    </Modal>
  ) : null;
};

export default AddSong;
