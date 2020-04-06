import React, { Fragment, useState, useEffect, useRef, memo } from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Button
} from "react-native";
import { Button as RNButton, Icon } from "react-native-elements";
import Modal from "react-native-modal";

import styles from "./styles";

import firebase from "src/utils/Firestore.js";
import listItemAvatar from "src/images/test_avatar.png";
import addIcon from "src/images/icons/add_song_icon.png";
import findIcon from "src/images/icons/find_btn.png";

import { UserType } from "src/store/reducers/LoginReducer";

import DefaultContainer from "src/containers/DefaultContainer";
import FanSignup from "src/containers/FanSignup";
import SongForm from "src/containers/SongForm";
import AddSong from "src/containers/AddSong";
import RoundImage from "src/components/RoundImage";
import DeleteModal from "src/components/DeleteModal";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import SongItem from "src/components/SongItem";
import { updateHeader } from "src/utils/UpdateHeader";

import { loadingStatus } from "src/store/actions/ActionCreator";
import { updateDoc, deleteDoc } from "src/services/api";
import { saveStorage } from "src/services/LocalStorage";
import UserFormWrapper from "src/services/user/UserFormWrapper";

const db = firebase.firestore();

const Setlist = ({
  authorized,
  loadingStatus,
  myArtist,
  navigation,
  route,
  userType
}) => {
  const isMountedRef = useRef(false);
  const unsubscribeRef = useRef(() => {});
  const [title, setTitle] = useState(null);
  const [song_artist, setSong_artist] = useState(null);
  const [edit_title, setEdit_title] = useState(null);
  const [edit_artist, setEdit_artist] = useState(null);
  const [update, setUpdate] = useState(null);
  const [add, setAdd] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const [songs, setSongs] = useState([]);
  const [titleComplete, setTitleComplete] = useState("");
  const [artistComplete, setArtistComplete] = useState("");
  const [artist, setArtist] = useState(route.params.artist);
  const [artistSongs, setArtistSongs] = useState([]);
  const [likes, setLikes] = useState([]);
  const [isArtist, setIsArtist] = useState(userType === UserType.ARTIST);
  const [edit_email, setEdit_email] = useState("");
  const [edit_password, setEdit_password] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [songDeleteId, setSongDeleteId] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    updateSongList();
    return () => {
      isMountedRef.current = false;
      unsubscribeRef.current();
    };
  }, []);

  useEffect(() => {
    if (!authorized && userType === "ARTIST") navigation.replace("Home");
  }, [authorized]);

  const updateSongList = async () => {
    loadingStatus(true);
    unsubscribeRef.current = db
      .doc(`artists/${artist._id}`)
      .onSnapshot(async doc => {
        if (!doc.data() || !isMountedRef.current) return;
        const currArtistSongs = (doc.data() || {}).songs || [];
        try {
          let songs = await Promise.all(
            currArtistSongs.map(async v => {
              const docRef = db.doc(`songs/${v._id}`);
              const snap = await docRef.get();
              return { ...snap.data(), ...v };
            })
          );

          if (isArtist) {
            songs = songs.sort((a, b) => {
              if (a.currVotes < b.currVotes) return 1;
              if (a.currVotes > b.currVotes) return -1;
              if (a.createdAt < b.createdAt) return -1;
              if (a.createdAt > b.createdAt) return 1;
              return 0;
            });
          }
          setAllSongs(songs);
          setSongs(songs);
          setArtistSongs(currArtistSongs);
          loadingStatus(false);
          setUpdate(false);
          setAdd(false);
          setTitle("");
          setSong_artist("");

          if (!songs.length) {
            openAddForm();
          }
        } catch (err) {
          console.log("Error: ", err);
        }
      });
  };

  const showEditForm = (i, songId) => () => {
    const { title, artist } = songs.find(el => el._id === songId);
    setEdit_title(title);
    setEdit_artist(artist);
    setUpdate(i);
  };

  const showLyrics = (i, songId) => () => {
    const { navigate } = navigation;
    const { title, artist } = songs.find(el => {
      return el._id === songId;
    });
    navigate("Lyrics", {
      name: "Lyrics",
      title,
      artist
    });
  };

  const cleanSong = song => {
    delete song.artist;
    delete song.title;
    delete song.mbid;
    return song;
  };

  const changeSongVisibility = async (_id, visible) => {
    const newSongs = songs.map(song => {
      song = cleanSong(song);
      if (song._id !== _id) return song;
      song.visible = visible;
      return song;
    });
    const res = await updateDoc("artist", { _id: artist._id, songs: newSongs });
  };

  const vote = (_id, currVotes, sentiment) => async () => {
    const { navigate } = navigation;
    const newCurrVotes = currVotes + (sentiment ? 1 : -1);
    if (!isArtist && !authorized) {
      setShowModal(true);
      return;
    }

    const newSongs = songs.map(song => {
      song = cleanSong(song);
      if (song._id !== _id) return song;
      song.currVotes = newCurrVotes;
      return song;
    });
    updateDoc("artist", { _id: artist._id, songs: newSongs });
    if (sentiment) {
      setLikes([...likes, _id]);
    } else {
      setLikes(likes.filter(i => i !== _id));
    }
  };

  const openAddForm = () => {
    setAdd(true);
    setTitleComplete("");
    setArtistComplete("");
    setEdit_title("");
    setEdit_artist("");
    setTitle("");
    setSong_artist("");
  };

  const renderButton = (text, onPress) => (
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

  const home = () => navigation.navigate("Home");

  const renderHeaderChildren = () => {
    const { name, genre } = artist;
    const headerPreface = isArtist ? "MANAGE " : "";
    return (
      <Fragment>
        <View style={styles.headerIconContatiner}>
          <TouchableOpacity onPress={openAddForm}>
            <RoundImage source={addIcon} style={styles.roundImage} size={44} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSearch}>
            <RoundImage source={findIcon} style={styles.roundImage} size={44} />
          </TouchableOpacity>
        </View>
        <AppText textStyle={[styles.text, { fontSize: 16, color: "white" }]}>
          {headerPreface}SETLIST
        </AppText>
      </Fragment>
    );
  };

  const handleSetShowModal = show => {
    setShowModal(show);
    console.log("HANDLESETSHOWMODAL setAdd", show);
    setAdd(show);
  };

  const onDeleteSong = id => {
    setShowDeleteModal(true);
    setSongDeleteId(id);
  };

  const onDeleteConfirm = confirm => {
    console.log("CONFIRM", confirm);
    if (confirm) {
      const { _id } = artist;
      const newSongs = songs.filter(song => song._id !== songDeleteId);
      updateDoc("artist", { _id, songs: newSongs });
    }
    setShowDeleteModal(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const search = text => {
    const filtered =
      allSongs.filter(
        v => v.title.toLowerCase().indexOf(text.toLowerCase()) > -1
      ) || !text;

    setSongs(filtered.length ? filtered : allSongs);
  };
  console.log("MY LOCATION", (myArtist || {}).location);
  return !isArtist && !artist.live ? (
    <View>
      <Text style={styles.text}>
        {`${(artist.name || "").toUpperCase()} has no current performance.`}
      </Text>
    </View>
  ) : (
    <DefaultContainer
      navigation={navigation}
      headerChildren={renderHeaderChildren()}
    >
      {showSearch && (
        <AppTextInput
          placeholder="Start typing"
          onChangeText={search}
          value=""
        />
      )}
      <ScrollView style={styles.scroll} pagingEnabled={true}>
        {songs.map(
          (song, i) =>
            (song.visible || isArtist) && (
              <SongItem
                key={i}
                song={song}
                userType={userType}
                liked={likes.indexOf(song._id) > -1}
                vote={vote}
                artistLiveStatus={artist.live}
                showEditForm={showEditForm(i, song._id)}
                showLyrics={showLyrics(i, song._id)}
                onDeleteSong={onDeleteSong}
                changeSongVisibility={changeSongVisibility}
              />
            )
        )}
      </ScrollView>

      {isArtist && add && (
        <AddSong
          setShow={handleSetShowModal}
          userArtistId={(myArtist || {})._id}
          complete={updateSongList}
          setlist={artistSongs}
        />
      )}
      {showModal && <FanSignup setShowModal={handleSetShowModal} />}
      {showDeleteModal && (
        <DeleteModal
          confirm={onDeleteConfirm}
          setShowModal={handleSetShowModal}
        />
      )}
    </DefaultContainer>
  );
};

const isEqual = (prev, next) =>
  (prev.myArtist || {})._id === (next.myArtist || {})._id &&
  prev.authorized === next.authorized;

const mapDispatchToProps = dispatch => ({
  loadingStatus: status => dispatch(loadingStatus(status))
});

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  myArtist: state.artist,
  userType: state.login.userType
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Setlist, isEqual));
