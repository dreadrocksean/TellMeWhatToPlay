import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { HubConnection } from '@aspnet/signalr';
import signalr from 'react-native-signalr';

import listItemAvatar from '../images/test_avatar.png';
import addIcon from '../images/icons/add_song_icon.png';

import { UserType } from '../redux/reducers/LoginReducer';

import DefaultContainer from './DefaultContainer';
import FanSignup from '../containers/FanSignup';
import SongForm from './SongForm';
import AddSong from './AddSong';
import RoundImage from '../components/RoundImage';
import DeleteModal from '../components/DeleteModal';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import SongItem from '../components/SongItem';
import { updateHeader } from '../utils/UpdateHeader';

import { loginUser } from '../redux/actions/ActionCreator';
import { fetchArtistSongs, createSong, updateSong, deleteSong, voteSong, createUser, fetchUser,
  fetchLastFMSong, fetchLyrics} from '../services/api';
import { saveStorage } from '../services/LocalStorage';
import UserFormWrapper from '../services/user/UserFormWrapper';


const { width, height } = Dimensions.get('window');

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
      title: null, song_artist: null, edit_title: null, edit_artist: null,
      loading: false, update: null, add: false, songs: [],
      titleComplete: '', artistComplete: '', mbid: '',
      artist: props.navigation.state.params.artist,
      likes: [],
      isArtist: props.userType === UserType.ARTIST,
      edit_email: '', edit_password: '',
      showModal: false,
      email: '',
      password: '',
      showDeleteModal: false,
      songDeleteId: null,
    };
    updateHeader(this.props);
    this.setShowModal = this.setShowModal.bind(this);
    this.updateSongList = this.updateSongList.bind(this);
    this.changeSongVisibility = this.changeSongVisibility.bind(this);
    this.onDeleteSong = this.onDeleteSong.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
  }

  sendMessage() {
    this.state.hubConnection
      .invoke('sendToAll', this.state.nick, this.state.message)
      .catch(err => console.error(err));

      this.setState({message: ''});      
  }

  componentDidMount() {
    this.updateSongList();
    // updateHeader(this.props);

    // this.connectWebSocket();


    // const hubConnection = new HubConnection('http://roadiethreeeightapi.azurewebsites.net/chat');

    // const nick = window.prompt('Your name:', 'John');

    // this.setState({ hubConnection/*, nick*/ }, () => {
    //   this.state.hubConnection
    //     .start()
    //     .then(() => console.log('Connection started!'))
    //     .catch(err => console.log('Error while establishing connection :('));
    // });

    // this.state.hubConnection.on('sendToAll', (nick, receivedMessage) => {
    //   const text = `${nick}: ${receivedMessage}`;
    //   const messages = this.state.messages.concat([text]);
    //   this.setState({ messages });
    // });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.artist === this.props.artist
      && nextProps.user === this.props.user
      && nextProps.authorized === this.props.authorized
    ) {
      // console.log('no change');
      return;
    }
    updateHeader(nextProps);
    this.setState({showModal: false});
  }

  connectWebSocket() {

    //This is the server under /example/server published on azure.
    const connection = signalr.hubConnection('http://roadiethreeeightapi.azurewebsites.net');
    // const connection = signalr.hubConnection('https://react-native-signalr.olofdahlbom.se');
    connection.logging = true;

    const proxy = connection.createHubProxy('chatHub');
    //receives broadcast messages from a hub function, called "helloApp"
    proxy.on('helloApp', (response) => {
      console.log('message-from-server', response);
      //Here I could response by calling something else on the server...
    });

    // atempt connection, and handle errors
    connection.start().done(() => {
      console.log('Now connected, connection ID=' + connection.id);

      proxy.invoke('helloServer', this.state.artist._id)
        .done((directResponse) => {
          console.log('direct-response-from-server', directResponse);
        }).fail(() => {
          console.warn('Something went wrong when calling server, it might not be up and running?')
        });

    }).fail(() => {
      console.log('Failed');
    });
    

    //connection-handling
    connection.connectionSlow(() => {
      console.log('We are currently experiencing difficulties with the connection.')
    });

    connection.error((error) => {
      const errorMessage = error.message;
      let detailedError = '';
      if (error.source && error.source._response) {
        detailedError = error.source._response;
      }
      if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
        console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
      }
      console.debug('SignalR error: ' + errorMessage, detailedError)
    });
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
      this.setState({ songs, loading: false, update: false, add: false, title: '', song_artist: '' });
    } catch (err) {
      console.log('ERROR: ', err);
      this.setState({ loading: false, update: false, add: false });
    }
  }

  showEditForm(i, songId) {
    const {title, artist} = this.state.songs.find( el => {
      return el._id === songId;
    });
    this.setState({edit_title: title, edit_artist: artist, update: i});
  }

  async showLyrics(i, songId) {
    const { navigate } = this.props.navigation;
    const {title, artist} = this.state.songs.find( el => {
      return el._id === songId;
    });

    try {
      const data = await this.props.fetchLyrics(title, artist);
      const lyrics = data.result.track.text;
      navigate('Lyrics', { name: 'Lyrics', lyrics })
    } catch (err) {
      navigate('Lyrics', { name: 'Lyrics', lyrics: 'Sorry. No lyrics available :-(' })
    }
  }

  async changeSongVisibility(songId, visible) {
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
    console.log('vote status', isArtist, authorized, showModal);
    if (!isArtist && !authorized) {
      this.setState({showModal: true});
      return;
    }
    // console.log('vote song', songId, sentiment);
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
      edit_artist: '',
      title: '',
      song_artist: '',
    });
  }

  renderButton (text, onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.close}>
        <View>
          <Text
            style={{
              color: '#d4d4ff',
              fontSize: 20,
              alignItems: 'center',
              textAlign: 'center',
            }}
          >{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  home() {
    this.props.navigation.navigate('Options');
  }

  renderHeaderLeft() {
    const { imageURL, name, genre } = this.props.artist;
    if (this.state.isArtist) {
      return (
        <TouchableOpacity
          onPress={this.openAddForm.bind(this)}
        >
          <RoundImage
            source={addIcon}
            style={{size: 40, borderColor: 'transparent'}}
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
        <RoundImage
          source={{uri: imageURL}}
          style={{
            size: 55,
            borderColor: '#ffd72b',
            borderWidth: 2,
            marginRight: 10,
          }}
        />
        <View style={{justifyContent: 'center'}} >
          <AppText
            textStyle={[styles.text, {fontSize: 18, textAlign: 'left', color: 'white'}]}
          >SETLIST</AppText>
          <AppText
            textStyle={[styles.text, {fontSize: 14, textAlign: 'left', color: '#2bfbff'}]}
          >{name}</AppText>
          <AppText
            textStyle={[styles.text, {fontSize: 10, textAlign: 'left', color: '#ff1668'}]}
          >{genre}</AppText>
        </View>
      </View>
    );
  }

  renderHeaderChildren() {
    return (
      <React.Fragment>
        {this.renderHeaderLeft()}
        {this.state.isArtist && (
          <AppText
            textStyle={[styles.text, {fontSize: 16, color: 'white'}]}
          >MANAGE SETLIST</AppText>
        )}
      </React.Fragment>
    );
  }

  setShowModal(show) {
    this.setState({showModal: show, add: show});
  }

  deleteSong(songId) {
    try {
      this.props.deleteSong(songId);
      this.updateSongList();
    } catch (err) {
      console.error('ERROR deleting song', err);
    }
  }

  onDeleteSong(id) {
    this.setState({
      showDeleteModal: true,
      songDeleteId: id,
    })
  }

  onDeleteConfirm(confirm) {
    if (confirm) {
      this.props.deleteSong(this.state.songDeleteId);
      this.updateSongList();
    }
    this.setState({showDeleteModal: false});
  }

  render() {
    const { authorized } = this.props;

    const {
      loading, add, songs, likes, isArtist, showModal, artist
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

    return (
      <DefaultContainer
        loading={this.state.loading}
        navigation={this.props.navigation}
        headerChildren={this.renderHeaderChildren()}
      >
        <ScrollView style={styles.scroll}
          pagingEnabled = {true}
        >
          {songs.map((song, i) => {
            // console.log('map artist.live', artist.live);
            const showSong = song.visible || isArtist;
            return showSong && (
              <SongItem
                key={i}
                song={song}
                userType={this.props.userType}
                liked={likes.indexOf(song._id) > -1}
                vote={this.vote.bind(this)}
                artistLiveStatus={artist.live}
                showEditForm={() => this.showEditForm(i, song._id)}
                showLyrics={() => this.showLyrics(i, song._id)}
                onDeleteSong={this.onDeleteSong.bind(this)}
                changeSongVisibility={this.changeSongVisibility}
              />
            );
          })}
        </ScrollView>

        <AddSong
          showModal={isArtist && add}
          setShowModal={this.setShowModal.bind(this)}
          userArtistId={(this.props.artist || {})._id}
          complete={this.updateSongList}
        />
        <FanSignup
          showModal={this.state.showModal}
          setShowModal={this.setShowModal}
        />
        <DeleteModal
          confirm={this.onDeleteConfirm}
          showModal={this.state.showDeleteModal}
          setShowModal={this.setShowModal}
        />
      </DefaultContainer>
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
    // marginTop: 20,
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
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 25,
    width: 25,
  },
  scroll: {
    flex: 1,
    marginTop: 10,
  },
  text: {
    fontSize: 36,
    // textAlign: 'left', 
    color: 'white',
    fontFamily: 'montserrat-regular',
  },
  artistInfo: {
    height: 70,
    justifyContent: 'center',
    marginLeft: 10,
    // backgroundColor: 'rgba(220,220,255,0.9)',
  },
  artistInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  }
});
