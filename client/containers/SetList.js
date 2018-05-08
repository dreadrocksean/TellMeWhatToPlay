import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { HubConnection } from '@aspnet/signalr';
import signalr from 'react-native-signalr';

import listItemAvatar from '../images/test_avatar.png';
import continueButton from '../images/buttons/continue_btn.png';

import { UserType } from '../redux/reducers/LoginReducer';

import DefaultContainer from './DefaultContainer';
import AppModal from '../components/Modal';
import SongForm from './SongForm';
import RoundImage from '../components/RoundImage';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import SongItem from '../components/SongItem';
import { updateHeader } from '../utils/UpdateHeader';

import { loginUser } from '../redux/actions/ActionCreator';
import { fetchArtistSongs, createSong, updateSong, deleteSong, voteSong, createUser, fetchUser,
  fetchLastFMSong, fetchLyrics} from '../services/api';
import UserFormWrapper from '../services/user/UserFormWrapper';
import { saveStorage } from '../services/LocalStorage';


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
      title: null, author: null, edit_title: null, edit_author: null,
      loading: false, update: null, add: false, songs: [],
      titleComplete: '', artistComplete: '', mbid: '',
      artist: props.navigation.state.params.artist,
      likes: [],
      isArtist: props.userType === UserType.ARTIST,
      edit_email: '', edit_password: '',
      showModal: false,
      email: '',
      password: '',
    };
    updateHeader(this.props);
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

    this.connectWebSocket();


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
    console.log('updateSongList');
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

  onModalChange(field, value) {
    this.setState({[field]: value});
  }

  async continue() {
    console.log('Setlist continue', this.state);
    const { email, password } = this.state;
    try {
      const user = await fetchUser({ email, password });
      console.log('Setlist continue', this.state);
      if (user) {
        this.setState({showModal: false});
        this.props.loginUser(user);
        await saveStorage({user});
      } else {
        this.setState({errorMessage: 'User not found'})
      }
    } catch(err) {
      console.log('Error: user not found.', err);
    }
  }

  renderHeaderChildren() {
    const { name, genre } = this.state.artist;
    return (
      <View style={styles.artistInfoContainer}>
        <RoundImage
          source={listItemAvatar}
          style={{size: 55}}
        />
        <View style={styles.artistInfo}>
          <AppText
            textStyle={[styles.text, {fontSize: 16, color: 'white'}]}
          >SETLIST</AppText>
          <AppText
            textStyle={[styles.text, {fontSize: 13, color: '#2bfbff'}]}
          >{name}</AppText>
          <AppText
            textStyle={[styles.text, {fontSize: 11, color: '#ff3a80'}]}
          >{genre}</AppText>
        </View>
      </View>
    );
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

    return (
      <DefaultContainer
        loading={this.state.loading}
        navigation={this.props.navigation}
        headerChildren={this.renderHeaderChildren()}
      >

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
                deleteSong={this.deleteSong.bind(this)}
                showSong={this.showSong.bind(this)}
              />
            );
          })}
        </ScrollView>
      { showModal &&
        <AppModal>
          <AppText
            style={{flex:1}}
            textStyle={{fontFamily: 'montserrat-regular'}}
          >LOG IN OR CREATE AN ACCOUNT</AppText>
          <AppTextInput
            style={{flex:1}}
            placeholder='Email'
            onChangeText={val => this.onModalChange.call(this, 'email', val)}
            value={this.state.email}
          />
          <AppTextInput
            style={{flex:1}}
            placeholder='Password'
            onChangeText={val => this.onModalChange.call(this, 'password', val)}
            value={this.state.password}
            secureTextEntry={true}
          />
          <TouchableOpacity style={{width: '100%', flex: 1}}
            onPress={this.continue.bind(this)}>
            <Image style={styles.image} source={continueButton} />
          </TouchableOpacity>
        </AppModal>
      }
      </DefaultContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload)),
});

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  artist: state.login.artist,
  userType: state.login.userType,
});
export default connect(mapStateToProps, mapDispatchToProps)(Setlist);

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
    textAlign: 'left', 
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
