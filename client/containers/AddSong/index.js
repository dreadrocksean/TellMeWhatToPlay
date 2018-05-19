import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';
import ArtistDropdown from './ArtistDropdown';
import Modal from '../../components/Modal';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import FormError from '../../components/FormError';
import addSongButton from '../../images/buttons/add_song_btn2.png';

import { loginUser } from '../../redux/actions/ActionCreator';
import { fetchUser, fetchLastFMSong } from '../../services/api';
import { saveStorage } from '../../services/LocalStorage';

const { width, height } = Dimensions.get('window');

class AddSong extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      songs: [],
      titleComplete: '',
      mbid: '',
      edit_title: '',
      edit_artist: '',
      errorMessage: null,
    };
    this.hide = this.hide.bind(this);
    this.addSong = this.addSong.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDropdownPress = this.onDropdownPress.bind(this);
  }

  hide() {
    console.log('hide');
    this.props.setShowModal(false);
  }

  handleChange(field, value) {
    this.setState({
      [field]: value,
      errorMessage: null,
    });
    this.fetchLastFMSongList(field);
  }

  async fetchLastFMSongList(field) {
    const key = Object.keys(field)[0];
    if (key === 'title' && !field[key]) {
      this.reset();
      return;
    }
    const title = (key === 'title') ? field[key] : this.state.edit_title;
    const artist = (key === 'artist') ? field[key] : this.state.edit_artist;
    try {
      const data = await fetchLastFMSong(title, artist);
      const songs = data.results.trackmatches.track.map((song, i) => ({title:song.name, artist:song.artist, mbid:song.mbid, key:i}));
      this.setState({
        songs,
        title,
        titleComplete: (songs[0] || {}).title,
        edit_title: title,
        edit_artist: artist,
      });
    } catch (err) {
      console.error('ERROR: ', err);
      this.reset();
    }
  }

  reset() {
    this.setState({
      songs: [],
      titleComplete: '',
      edit_title: '',
      edit_artist: '',
      title: '',
      artist: '',
    });
  }

  async addSong() {
    const {title, artist, mbid} = this.state;
    if (!title || !artist) {
      this.setState({add: false});
      return;
    }
    try {
      const newSong = await this.props.createSong({
        title: title.trim(),
        artist: artist.trim(),
        artist_id: artist._id, mbid
      });
      console.log('Success!: ', newSong);
      this.updateSongList();
    } catch (err) {
      console.error('ERROR creating song', err);
      this.setState({add: false})
    }
  }

  async addSong() {
    const { title, artist } = this.state;
    try {
      const response = await fetchLastFMSong({ title, artist });
      console.log('Setlist addSong', response);
      const song = response.song;
      if (song) {
        this.props.setShowModal(false);
      } else {
        this.setState({errorMessage: 'Song not found'})
      }
    } catch(err) {
      console.log('Error: song not found.', err);
      this.setState({errorMessage: err.message})
    }
  }

  onDropdownPress(song) {
    this.setState({
      songs: [],
      title: song.title,
      titleComplete: '',
      artist: song.artist,
      mbid: song.mbid,

    });
  }

  render() {
    const {
      songs,
      errorMessage,
      titleComplete,
      title,
      artist,
      edit_title,
      edit_artist,
    } = this.state;

    return this.props.showModal ?
      (
        <Modal dismiss={this.hide} >
          <AppText
            style={{flex:1}}
            textStyle={{fontFamily: 'montserrat-regular'}}
          >
            ADD NEW SONG
          </AppText>
          {errorMessage && <FormError>{errorMessage}</FormError>}
          <View style={styles.inputContainer}>
            <AppTextInput
              style={styles.autocomplete}
              placeholder={titleComplete || ''}
              editable={false}
            />
            <AppTextInput
              style={styles.input}
              placeholder='Title'
              onChangeText={title => this.handleChange({title})}
              value={title}
            />
          </View>
          <View style={styles.inputContainer}>
            <AppTextInput
              style={styles.input}
              placeholder={ 'Artist' }
              onChangeText={artist => this.handleChange({artist})}
              value={artist}
            />
            <ArtistDropdown data={songs} onPress={this.onDropdownPress} />
          </View>
          <TouchableOpacity style={styles.imageWrapper}
            onPress={this.addSong}>
            <Image style={styles.image} source={addSongButton} />
          </TouchableOpacity>
        </Modal>
      )
      : null;
  };

}

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload)),
});

export default connect(null, mapDispatchToProps)(AddSong);