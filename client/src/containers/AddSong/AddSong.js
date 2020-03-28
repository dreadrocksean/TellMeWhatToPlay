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
  titleComplete: "",
  artistComplete: "",
  errorMessage: null
};

const AddSong = ({
  setShowModal,
  showModal,
  userArtistId,
  setlist,
  complete
}) => {
  const [formattedTitle, setFormattedTitle] = useState({
    ...init.formattedTitle
  });
  const [formattedArtist, setFormattedArtist] = useState({
    ...init.formattedArtist
  });
  const [songs, setSongs] = useState(init.songs);
  const [titleComplete, setTitleComplete] = useState(init.titleComplete);
  const [artistComplete, setArtistComplete] = useState(init.artistComplete);
  const [errorMessage, setErrorMessage] = useState(init.errorMessage);

  const _isMountedRef = useRef(false);
  const allSongsRef = useRef([]);
  const songRef = useRef({});
  const titleRef = useRef("");
  const artistRef = useRef("");

  useEffect(() => {
    _isMountedRef.current = true;
    return () => (_isMountedRef.current = false);
  }, []);

  useEffect(() => {
    if (titleRef.current.trim().length < 3) {
      updateState({
        formattedTitle: { ...init.formattedTitle, visible: titleRef.current },
        titleComplete: init.titleComplete
      });
    } else {
      songRef.current =
        songs.find(v =>
          v.title.toLowerCase().includes(titleRef.current.toLowerCase())
        ) ||
        songs[0] ||
        {};
      const titleComplete = songRef.current.title;
      const formattedTitle = getFormattedStr(titleRef.current, titleComplete);
      updateState({ formattedTitle, titleComplete });
    }
    const artistComplete = songRef.current.artist;
    const formattedArtist = getFormattedStr(artistRef.current, artistComplete);
    updateState({ formattedArtist, artistComplete });
  }, [songs]);

  const reset = () => {
    allSongsRef.current = [];
    songRef.current = {};
    updateState({ formattedTitle: "", titleComplete: "", songs: [] });
  };

  const hide = () => {
    reset();
    setShowModal(false);
  };

  const updateState = ({
    formattedTitle,
    formattedArtist,
    titleComplete,
    artistComplete,
    songs
  }) => {
    if (typeof formattedTitle !== "undefined")
      setFormattedTitle(formattedTitle);
    if (typeof formattedArtist !== "undefined")
      setFormattedArtist(formattedArtist);
    if (typeof titleComplete !== "undefined") setTitleComplete(titleComplete);
    if (typeof artistComplete !== "undefined")
      setArtistComplete(artistComplete);
    if (typeof songs !== "undefined") setSongs(songs);
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
    console.log("VALUE", value);
    setErrorMessage(null);
    if (field === "title") {
      titleRef.current = value;
      try {
        const songs = await fetchSongSuggestionList({ [field]: value });
        allSongsRef.current = songs;
        setSongs(allSongsRef.current);
      } catch (err) {}
    } else {
      artistRef.current = value;
      const filteredSongs = (allSongsRef.current || []).filter(v =>
        v.artist.toLowerCase().includes(value.toLowerCase())
      );
      setSongs(filteredSongs);
    }
  };

  const fetchSongSuggestionList = async payload => {
    const key = Object.keys(payload)[0];
    const title = key === "title" ? payload[key] : "";
    const artist = key === "artist" ? payload[key] : "";
    try {
      const data = await fetchLastFMSong(title, artist);
      if (!_isMountedRef.current) return;
      const track = data.results ? data.results.trackmatches.track : [];
      const songs = track.map((song, i) => ({
        title: song.name,
        artist: song.artist,
        mbid: song.mbid,
        key: i
      }));
      return Promise.resolve(songs);
    } catch (err) {
      console.log("ERR", err);
      return Promise.reject(err);
    }
  };

  const addSong = async () => {
    if (!titleComplete || !artistComplete) {
      setErrorMessage("Fields cannot be empty");
      return;
    }
    const data = {
      title: titleComplete.trim(),
      artist: artistComplete.trim(),
      mbid
    };
    const response = await createDoc("song", data);
    if (!_isMountedRef.current) return;
    if (response.success) {
      const song = response.data;
      await updateDoc("artist", {
        _id: userArtistId,
        songs: [
          ...setlist,
          { _id: song._id, votes: 0, currVotes: 0, visible: false }
        ]
      });
    }
    complete();
    reset();
    hide();
  };

  const onDropdownPress = song => {
    updateState({
      titleComplete: song.title,
      artistComplete: song.artist
    });
  };

  const renderAction = () => (
    <TouchableOpacity
      style={{ width: "100%", height: 50, marginTop: 10 }}
      onPress={addSong}
    >
      <Image style={styles.image} source={addSongButton} />
    </TouchableOpacity>
  );

  console.log("ARTISTCOMPLETE", artistComplete);
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
          placeholder={titleComplete || ""}
          editable={false}
        />
        <AppTextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={handleChange("title")}
          formattedValue={formattedTitle}
        />
      </View>
      <View style={styles.inputContainer}>
        <AppTextInput
          style={styles.autocomplete}
          placeholder={artistComplete || ""}
          editable={false}
        />
        <AppTextInput
          style={styles.input}
          placeholder="Artist"
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
