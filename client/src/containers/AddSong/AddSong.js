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
  title: "",
  formattedTitle: { invisible: "", visible: "" },
  formattedArtist: { invisible: "", visible: "" },
  artist: "",
  songs: [],
  titleComplete: "",
  artistComplete: "",
  mbid: "",
  edit_title: "",
  edit_artist: "",
  errorMessage: null
};

const AddSong = ({
  setShowModal,
  showModal,
  userArtistId,
  setlist,
  complete
}) => {
  const [title, setTitle] = useState(init.title);
  const [formattedTitle, setFormattedTitle] = useState(init.formattedTitle);
  const [formattedArtist, setFormattedArtist] = useState(init.formattedArtist);
  const [artist, setArtist] = useState(init.artist);
  const [songs, setSongs] = useState(init.songs);
  const [titleComplete, setTitleComplete] = useState(init.titleComplete);
  const [artistComplete, setArtistComplete] = useState(init.artistComplete);
  const [mbid, setMbid] = useState(init.mbid);
  const [edit_title, setEdit_title] = useState(init.edit_title);
  const [edit_artist, setEdit_artist] = useState(init.edit_artist);
  const [errorMessage, setErrorMessage] = useState(init.errorMessage);

  const _isMounted = useRef(false);

  useEffect(() => {
    _isMounted.current = true;
    console.log("ADDSONG MOUNTED");
    // reset();
    return () => {
      _isMounted.current = false;
      console.log("ADDSONG UN-MOUNTED");
    };
  }, []);

  const getFormattedStr = (strComplete, strOptional, strFormatted) => {
    const str = strOptional || strFormatted.visible;

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

  const presetState = params => {
    if (!_isMounted.current) return;

    const { titleComplete, title, artistComplete, artist } = params;
    setFormattedTitle(getFormattedStr(titleComplete, title, formattedTitle));
    setFormattedArtist(
      getFormattedStr(artistComplete, artist, formattedArtist)
    );

    setArtist(params.artist);
    setSongs(params.songs);
    setTitleComplete(params.titleComplete);
    setArtistComplete(params.artistComplete);
    setMbid(params.mbid);
    setEdit_title(params.edit_title);
    setEdit_artist(params.edit_artist);
    setErrorMessage(params.errorMessage);
  };

  const reset = () => presetState(init);

  const hide = () => {
    reset();
    setShowModal(false);
  };

  const handleChange = field => value => {
    if (field === "title" && !value.trim) reset();
    if (field === "artist" && !value.trim) reset();
    presetState({
      [field]: value,
      errorMessage: null
    });
    fetchSongSuggestionList({ [field]: value });
  };

  const fetchSongSuggestionList = async payload => {
    const key = Object.keys(payload)[0];
    if (key === "title" && !payload[key]) {
      reset();
      return;
    }
    const title = key === "title" ? payload[key] : edit_title;
    const artist = key === "artist" ? payload[key] : edit_artist;
    try {
      const data = await fetchLastFMSong(title, artist);
      const track = data.results ? data.results.trackmatches.track : [];
      const songs = track.map((song, i) => ({
        title: song.name,
        artist: song.artist,
        mbid: song.mbid,
        key: i
      }));
      if (!songs.length) return;

      const bestChoice = songs[0] || {};

      presetState({
        songs,
        title,
        titleComplete: bestChoice.title,
        artistComplete: bestChoice.artist,
        edit_title: title,
        edit_artist: artist,
        artist,
        mbid: bestChoice.mbid
      });
    } catch (err) {
      console.error("ERROR: ", err);
      reset();
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
    console.log("addSong DATA", data);
    const response = await createDoc("song", data);
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
    console.log("onDropdownPress SONG", song);
    presetState({
      titleComplete: song.title,
      artistComplete: song.artist,
      artist: "",
      mbid: song.mbid
    });
  };

  const renderAction = () => (
    <TouchableOpacity style={styles.imageWrapper} onPress={addSong}>
      <Image style={styles.image} source={addSongButton} />
    </TouchableOpacity>
  );

  const Test = () => (
    <TouchableOpacity style={{ width: 200, height: 50 }} onPress={addSong}>
      <Image style={styles.image} source={addSongButton} />
    </TouchableOpacity>
  );

  const action = renderAction();
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
          placeholder={artistComplete || "Artist"}
          editable={false}
        />
        <AppTextInput
          style={styles.input}
          onChangeText={handleChange("artist")}
          placeholder={""}
          value={artist}
        />
        <ArtistDropdown
          data={songs}
          action={Test()}
          onPress={onDropdownPress}
        />
      </View>
      {action}
    </Modal>
  ) : null;
};

export default AddSong;
