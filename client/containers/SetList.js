import React, { Component } from "react";
import { connect } from "react-redux";
import { StackNavigator } from "react-navigation";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image
} from "react-native";
import { Button as RNButton, Icon } from "react-native-elements";
import Modal from "react-native-modal";
import firebase from "../utils/Firestore.js";

import listItemAvatar from "../images/test_avatar.png";
import addIcon from "../images/icons/add_song_icon.png";
import findIcon from "../images/icons/find_btn.png";

import { UserType } from "../redux/reducers/LoginReducer";

import DefaultContainer from "./DefaultContainer";
import FanSignup from "../containers/FanSignup";
import SongForm from "./SongForm";
import AddSong from "./AddSong";
import RoundImage from "../components/RoundImage";
import DeleteModal from "../components/DeleteModal";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import SongItem from "../components/SongItem";
import { updateHeader } from "../utils/UpdateHeader";

import { loginUser } from "../redux/actions/ActionCreator";
import { updateDoc, deleteDoc, fetchLyrics } from "../services/api";
import { saveStorage } from "../services/LocalStorage";
import UserFormWrapper from "../services/user/UserFormWrapper";

const db = firebase.firestore();
const { width, height } = Dimensions.get("window");

class Setlist extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerStyle = Object.assign(
      {},
      params.bg ? { backgroundColor: params.bg } : null
    );
    return {
      title: `${params.title || params.screen || "Set List"}`,
      headerTitleStyle: { textAlign: "center", alignSelf: "center" },
      headerStyle
    };
  };

  static defaultProps = {
    fetchLyrics
  };

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      song_artist: null,
      edit_title: null,
      edit_artist: null,
      loading: false,
      update: null,
      add: false,
      allSongs: [],
      songs: [],
      titleComplete: "",
      artistComplete: "",
      mbid: "",
      artist: props.navigation.state.params.artist,
      likes: [],
      isArtist: props.userType === UserType.ARTIST,
      edit_email: "",
      edit_password: "",
      showModal: false,
      email: "",
      password: "",
      showDeleteModal: false,
      songDeleteId: null,
      showSearch: false
    };
    updateHeader(this.props);
  }

  setState = params => {
    if (!this._isMounted) {
      return;
    }
    super.setState(params);
  };

  sendMessage() {
    this.state.hubConnection
      .invoke("sendToAll", this.state.nick, this.state.message)
      .catch(err => console.error(err));

    this.setState({ message: "" });
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateSongList();
    // updateHeader(this.props);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.unsubscribe();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.artist === this.props.artist &&
      nextProps.user === this.props.user &&
      nextProps.authorized === this.props.authorized
    ) {
      // console.log('no change');
      return;
    }
    updateHeader(nextProps);
    this.setState({ showModal: false });
  }

  updateSongList = async () => {
    this.setState({ loading: true });
    this.unsubscribe = db
      .doc(`artists/${this.state.artist._id}`)
      .onSnapshot(async doc => {
        if (!doc.data()) return;
        const artistSongs = (doc.data() || {}).songs || [];
        try {
          let songs = await Promise.all(
            artistSongs.map(async v => {
              const docRef = db.doc(`songs/${v._id}`);
              const snap = await docRef.get();
              return { ...snap.data(), ...v };
            })
          );
          console.log("songs: ", songs);

          if (this.state.isArtist) {
            songs = songs.sort((a, b) => {
              if (a.currVotes < b.currVotes) return 1;
              if (a.currVotes > b.currVotes) return -1;
              if (a.createdAt < b.createdAt) return -1;
              if (a.createdAt > b.createdAt) return 1;
              return 0;
            });
          }
          this.setState({
            allSongs: songs,
            songs,
            artistSongs,
            loading: false,
            update: false,
            add: false,
            title: "",
            song_artist: ""
          });
          if (!songs.length) {
            this.openAddForm();
          }
        } catch (err) {
          console.log("Error: ", err);
        }
      });
  };

  showEditForm = (i, songId) => () => {
    const { title, artist } = this.state.songs.find(el => {
      return el._id === songId;
    });
    this.setState({ edit_title: title, edit_artist: artist, update: i });
  };

  showLyrics = (i, songId) => async () => {
    const { navigate } = this.props.navigation;
    const { title, artist } = this.state.songs.find(el => {
      return el._id === songId;
    });

    try {
      const data = await this.props.fetchLyrics(title, artist);
      const lyrics = data.result.track.text;
      navigate("Lyrics", { name: "Lyrics", lyrics });
    } catch (err) {
      navigate("Lyrics", {
        name: "Lyrics",
        lyrics: "Sorry. No lyrics available :-("
      });
    }
  };

  cleanSong = song => {
    delete song.artist;
    delete song.title;
    delete song.mbid;
    return song;
  };

  changeSongVisibility = async (_id, visible) => {
    const { songs, artist } = this.state;
    const newSongs = songs.map(song => {
      song = this.cleanSong(song);
      if (song._id !== _id) return song;
      song.visible = visible;
      return song;
    });
    updateDoc("artist", { _id: artist._id, songs: newSongs });
  };

  vote = (_id, currVotes, sentiment) => async () => {
    const { authorized, artist, navigation } = this.props;
    const { isArtist, showModal } = this.state;
    const { navigate } = navigation;
    const newCurrVotes = currVotes + (sentiment ? 1 : -1);
    console.log("vote status", isArtist, authorized, showModal);
    if (!isArtist && !authorized) {
      this.setState({ showModal: true });
      return;
    }

    const newSongs = this.state.songs.map(song => {
      song = this.cleanSong(song);
      if (song._id !== _id) return song;
      song.currVotes = newCurrVotes;
      return song;
    });
    updateDoc("artist", { _id: this.state.artist._id, songs: newSongs });
    if (sentiment) {
      this.setState({ likes: [...this.state.likes, _id] });
    } else {
      this.setState({ likes: this.state.likes.filter(i => i !== _id) });
    }
  };

  handleEditChange = field => {
    const key = Object.keys(field)[0];
    this.setState({ ["edit_" + key]: field[key] });
  };

  openAddForm = () => {
    this.setState({
      add: true,
      titleComplete: "",
      artistComplete: "",
      edit_title: "",
      edit_artist: "",
      title: "",
      song_artist: ""
    });
  };

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.close}>
      <View>
        <Text
          style={{
            color: "#d4d4ff",
            fontSize: 20,
            alignItems: "center",
            textAlign: "center"
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  home = () => this.props.navigation.navigate("Options");

  renderHeaderChildren = () => {
    const { name, genre } = this.state.artist;
    const headerPreface = this.state.isArtist ? "MANAGE " : "";
    return (
      <React.Fragment>
        <TouchableOpacity onPress={this.openAddForm}>
          <RoundImage
            source={addIcon}
            style={{ size: 40, borderColor: "transparent" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toggleSearch}>
          <RoundImage
            source={findIcon}
            style={{ size: 40, borderColor: "transparent" }}
          />
        </TouchableOpacity>
        <AppText textStyle={[styles.text, { fontSize: 16, color: "white" }]}>
          {headerPreface}SETLIST
        </AppText>
      </React.Fragment>
    );
  };

  setShowModal = show => this.setState({ showModal: show, add: show });

  onDeleteSong = id => {
    this.setState({
      showDeleteModal: true,
      songDeleteId: id
    });
  };

  onDeleteConfirm = confirm => {
    if (confirm) {
      const {
        songs,
        songDeleteId,
        artist: { _id }
      } = this.state;
      const newSongs = songs.filter(song => song._id !== songDeleteId);
      updateDoc("artist", { _id, songs: newSongs });
    }
    this.setState({ showDeleteModal: false });
  };

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  search = text => {
    const filtered =
      this.state.allSongs.filter(
        v => v.title.toLowerCase().indexOf(text.toLowerCase()) > -1
      ) || !text;

    this.setState({
      songs: filtered.length ? filtered : this.state.allSongs
    });
  };

  render() {
    const { authorized } = this.props;

    const {
      loading,
      add,
      songs,
      likes,
      isArtist,
      showModal,
      artist,
      showSearch
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
        {showSearch && (
          <AppTextInput
            placeholder="Start typing"
            onChangeText={this.search}
            value=""
          />
        )}
        <ScrollView style={styles.scroll} pagingEnabled={true}>
          {songs.map((song, i) => {
            // console.log('map artist.live', artist.live);
            const showSong = song.visible || isArtist;
            return (
              showSong && (
                <SongItem
                  key={i}
                  song={song}
                  userType={this.props.userType}
                  liked={likes.indexOf(song._id) > -1}
                  vote={this.vote}
                  artistLiveStatus={artist.live}
                  showEditForm={this.showEditForm(i, song._id)}
                  showLyrics={this.showLyrics(i, song._id)}
                  onDeleteSong={this.onDeleteSong}
                  changeSongVisibility={this.changeSongVisibility}
                />
              )
            );
          })}
        </ScrollView>

        <AddSong
          showModal={isArtist && add}
          setShowModal={this.setShowModal}
          userArtistId={(this.props.artist || {})._id}
          complete={this.updateSongList}
          setlist={this.state.artistSongs}
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
  userType: state.login.userType
});
export default connect(mapStateToProps)(Setlist);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    // backgroundColor: '#ddd',
    alignItems: "stretch",
    // justifyContent: 'center',
    padding: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 25,
    width: 25
  },
  scroll: {
    flex: 1,
    marginTop: 10
  },
  text: {
    fontSize: 36,
    // textAlign: 'left',
    color: "white",
    fontFamily: "montserrat-regular"
  },
  artistInfo: {
    height: 70,
    justifyContent: "center",
    marginLeft: 10
    // backgroundColor: 'rgba(220,220,255,0.9)',
  },
  artistInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  }
});
