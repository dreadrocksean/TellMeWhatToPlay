import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';

import { UserType } from '../redux/reducers/LoginReducer';
import SongForm from './SongForm';
import SongItem from '../components/SongItem';
import { fetchArtistSongs, createSong, updateSong, deleteSong, voteSong, createUser, fetchUser,
  fetchLastFMSong, fetchLyrics} from '../services/api';
import UserForm from '../services/user/UserForm';
import { updateHeader } from '../utils/UpdateHeader';

class Setlist extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerStyle = Object.assign({},
      params.bg ? {backgroundColor: params.bg} : null
    );
    return {
      title: `${params.title || params.screen || 'Set List'}`,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
      headerStyle,
    };
  };

  static defaultProps = { fetchArtistSongs, createSong, updateSong, deleteSong, voteSong,
    fetchLastFMSong, fetchLyrics};

  constructor(props) {
    super(props);
    this.state = {
      title: null, author: null, edit_title: null, edit_author: null,
      loading: false, update: null, add: false, songs: [],
      titleComplete: '', artistComplete: '', mbid: '',
      artist: props.navigation.state.params.artist,
      likes: [],
      isArtist: props.userType === UserType.ARTIST,
      edit_email: '', edit_password: '',
      showModal: false,
    };
    updateHeader(this.props);
  }

  componentDidMount() {
    this.updateSongList();
    updateHeader(this.props);
  }

  componentWillReceiveProps(nextProps) {
  }

  async updateSongList() {
    // this.setState({ loading: true });
    try {
      const data = await this.props.fetchArtistSongs(this.state.artist._id);
      let songs = data.songs;
      if (this.state.isArtist) {
        songs = songs.sort((a, b) => {
          if (a.currVotes < b.currVotes) return 1;
          if (a.currVotes > b.currVotes) return -1;
          if (a.createdAt < b.createdAt) return -1;
          if (a.createdAt > b.createdAt) return 1;
          return 0;
        });
      }
      // console.log('songs', songs);
      // songs = songs.filter(song => song.visible);
      this.setState({ songs, loading: false, update: false, add: false, title: '', author: '' });
    } catch (err) {
      console.log('ERROR: ', err);
      this.setState({ loading: false, update: false, add: false });
    }
  }

  async fetchLastFMSongList(field) {
    const key = Object.keys(field)[0];
    if (key === 'title' && !field[key]) {
      this.openAddForm();
      return;
    }
    const title = (key === 'title') ? field[key] : this.state.edit_title;
    const artist = (key === 'artist') ? field[key] : this.state.edit_author;
    try {
      const data = await this.props.fetchLastFMSong(title, artist);
      const songs = data.results.trackmatches.track.map(song => ({title:song.name, artist:song.artist, mbid:song.mbid}));
      this.setState({
        titleComplete: (songs[0] || {}).title,
        artistComplete: (songs[0] || {}).artist,
        title: (songs[0] || {}).title,
        author: (songs[0] || {}).artist,
        mbid: (songs[0] || {}).mbid,
        edit_title: title,
        edit_author: artist,
      });
    } catch (err) {
      console.error('ERROR: ', err);
      this.openAddForm();
    }
  }

  async addSong() {
    const {title, author, mbid, artist} = this.state;
    if (!title || !author) {
      this.setState({add: false});
      return;
    }
    try {
      const newSong = await this.props.createSong({
        title: title.trim(),
        author: author.trim(),
        artist_id: artist._id, mbid
      });
      console.log('Success!: ', newSong);
      this.updateSongList();
    } catch (err) {
      console.error('ERROR creating song', err);
      this.setState({add: false})
    }
  }

  async updateSongItem(songId) {
    const {edit_title, edit_author} = this.state;
    try {
      const updatedSong = await this.props.updateSong({ _id: songId, title: edit_title, author: edit_author });
      console.log('Updated Success!: ', updatedSong);
      this.setState({update: null})
      this.updateSongList();
      this.setState({edit_title: '', edit_author: ''});
    } catch (err) {
      console.error('ERROR updating song', err);
      this.setState({update: null})
    }
  }

  showEditForm(i, songId) {
    const {title, author} = this.state.songs.find( el => {
      return el._id === songId;
    });
    this.setState({edit_title: title, edit_author: author, update: i});
  }

  async showLyrics(i, songId) {
    const { navigate } = this.props.navigation;
    const {title, author} = this.state.songs.find( el => {
      return el._id === songId;
    });

    try {
      const data = await this.props.fetchLyrics(title, author);
      const lyrics = data.result.track.text;
      navigate('Lyrics', { name: 'Lyrics', lyrics })
    } catch (err) {
      navigate('Lyrics', { name: 'Lyrics', lyrics: 'Sorry. No lyrics available :-(' })
    }
  }

  deleteSong(songId) {
    try {
      this.props.deleteSong(songId);
      this.updateSongList();
    } catch (err) {
      console.error('ERROR deleting song', err);
    }
  }

  async showSong(songId, visible) {
    try {
      await this.props.updateSong({ _id: songId, visible });
      this.updateSongList();
    } catch (err) {
      console.error('ERROR updating song visibilty', err);
    }
  }

  async vote(songId, sentiment) {
    const { authorized, artist, navigation } = this.props;
    const { isArtist, showModal } = this.state;
    const { navigate } = navigation;
    if (!isArtist && !authorized) {
      this.setState({showModal: true});
      return;
    }
    // console.log('vote song', songId);
    try {
      await this.props.voteSong({ _id: songId, sentiment });
      if (sentiment) {
        this.setState({likes: [...this.state.likes, songId]});
      } else {
        this.setState({likes: this.state.likes.filter(i=>i!==songId)});
      }
      await this.updateSongList();
    } catch (err) {
      console.error('ERROR voting song', err);
    }
  }

  handleChange(field) {
    // const key = Object.keys(field)[0];
    // this.setState({['edit_'+key]: field[key]});
    this.fetchLastFMSongList(field);
    // this.setState(field);
  }

  handleEditChange(field) {
    const key = Object.keys(field)[0];
    this.setState({['edit_'+key]: field[key]});
  }

  openAddForm() {
    this.setState({
      add: true,
      titleComplete: '',
      artistComplete: '',
      edit_title: '',
      edit_author: '',
      title: '',
      author: '',
    });
  }

  render() {
    const { authorized } = this.props;

    const {
      title, author, edit_title, edit_author,
      loading, update, add, songs,
      titleComplete, artistComplete, mbid,
      artist, likes, isArtist, showModal
    } = this.state;

    if (!isArtist && !artist.live) {
      return (
        <View>
          <Text style={styles.text}>
            {`${artist.name.toUpperCase()} has no current performance.`}
          </Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tell Me What To Play!</Text>

        {
          isArtist && add && (
            <SongForm
              handleChange={this.handleChange.bind(this)}
              onSubmit={this.addSong.bind(this)}
              edit_title={edit_title}
              edit_author={edit_author}
              command={'Add'}
              titleComplete={titleComplete}
              artistComplete={artistComplete}
            />
          )
        }
        {
          isArtist && !add && (
            <RNButton
              backgroundColor={'#8888ff'}
              borderRadius={10}
              icon={{name: 'music', type: 'font-awesome'}}
              onPress={this.openAddForm.bind(this)}
              title={'Add Song'}
            />
          )
        }

        <ScrollView style={styles.scroll}
          pagingEnabled = {true}
        >
          {songs.map((song, i) => {
            // console.log('map', song);
            return update === i
              ? <SongForm
                  key={i}
                  handleChange={this.handleEditChange.bind(this)}
                  onSubmit={() => this.updateSongItem(song._id)}
                  title={edit_title}
                  author={edit_author}
                  command={'Save'}
              />
              : <SongItem
                  key={i}
                  song={song}
                  userType={this.props.userType}
                  liked={likes.indexOf(song._id) > -1}
                  vote={this.vote.bind(this)}
                  artistLiveStatus={artist.live}
                  showEditForm={() => this.showEditForm(i, song._id)}
                  showLyrics={() => this.showLyrics(i, song._id)}
                  deleteSong={this.deleteSong.bind(this)}
                  showSong={this.showSong.bind(this)}
              />
          })}
        </ScrollView>
        <Modal style={styles.modalContainer}
          isVisible={showModal}
          backdropColor={'#000'}
          backdropOpacity={0.7}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          <UserForm />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  artist: state.login.artist,
  userType: state.login.userType,
});
export default connect(mapStateToProps)(Setlist);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // backgroundColor: '#ddd',
    alignItems: 'stretch',
    // justifyContent: 'center',
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    marginTop: 10,
  },
  text: {
    fontSize: 36,
    textAlign: 'center', 
  },
});
