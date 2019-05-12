import React, { Component } from "react";
import { connect } from "react-redux";
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
import Modal from "../../components/Modal";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/AppTextInput";
import FormError from "../../components/FormError";
import addSongButton from "../../images/buttons/add_song_btn2.png";

import { fetchUser, fetchLastFMSong, createSong } from "../../services/api";
import { saveStorage } from "../../services/LocalStorage";

const { width, height } = Dimensions.get("window");

const resetState = {
  title: "",
  artist: "",
  songs: [],
  titleComplete: "",
  mbid: "",
  edit_title: "",
  edit_artist: "",
  errorMessage: null
};

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = resetState;
  }

  reset = () => this.setState(resetState);

  hide = () => this.props.setShowModal(false);

  handleChange = (field, value) => {
    this.setState({
      [field]: value,
      errorMessage: null
    });
    this.fetchSongSuggestionList(field);
  };

  fetchSongSuggestionList = async field => {
    const key = Object.keys(field)[0];
    if (key === "title" && !field[key]) {
      this.reset();
      return;
    }
    const title = key === "title" ? field[key] : this.state.edit_title;
    const artist = key === "artist" ? field[key] : this.state.edit_artist;
    try {
      const data = await fetchLastFMSong(title, artist);
      const songs = data.results.trackmatches.track.map((song, i) => ({
        title: song.name,
        artist: song.artist,
        mbid: song.mbid,
        key: i
      }));
      this.setState({
        songs,
        title,
        titleComplete: (songs[0] || {}).title,
        edit_title: title,
        edit_artist: artist
      });
    } catch (err) {
      console.error("ERROR: ", err);
      this.reset();
    }
  };

  addSong = async () => {
    const { title, artist, mbid } = this.state;
    if (!title || !artist) {
      this.setState({ errorMessage: "Fields cannot be empty" });
      return;
    }
    try {
      const newSong = await createDoc("song", {
        title: title.trim(),
        artist: artist.trim(),
        user_artist_id: this.props.userArtistId,
        mbid
      });
      this.props.complete();
      this.reset();
      this.hide();
    } catch (err) {
      console.error("ERROR creating song", err);
      this.setState({ errorMessage: `ERROR creating song: ${err}` });
    }
  };

  onDropdownPress = song => {
    this.setState({
      songs: [],
      title: song.title,
      titleComplete: "",
      artist: song.artist,
      mbid: song.mbid
    });
  };

  render() {
    const {
      songs,
      errorMessage,
      titleComplete,
      title,
      artist,
      edit_title,
      edit_artist
    } = this.state;

    return this.props.showModal ? (
      <Modal dismiss={this.hide}>
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
            onChangeText={title => this.handleChange({ title })}
            value={title}
          />
        </View>
        <View style={styles.inputContainer}>
          <AppTextInput
            style={styles.input}
            placeholder={"Artist"}
            onChangeText={artist => this.handleChange({ artist })}
            value={artist}
          />
          <ArtistDropdown data={songs} onPress={this.onDropdownPress} />
        </View>
        <TouchableOpacity style={styles.imageWrapper} onPress={this.addSong}>
          <Image style={styles.image} source={addSongButton} />
        </TouchableOpacity>
      </Modal>
    ) : null;
  }
}

export default AddSong;
