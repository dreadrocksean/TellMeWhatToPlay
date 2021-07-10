import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
  memo
} from "react";
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

import styles from "./styles";

import firebase from "src/utils/Firestore.js";
// import listItemAvatar from "src/images/test_avatar.png";
import addIcon from "src/images/icons/add_song_icon.png";
import findIcon from "src/images/icons/find_btn.png";

import { UserType } from "src/store/reducers/LoginReducer";

import DefaultContainer from "src/containers/DefaultContainer";
import FanSignup from "src/containers/FanSignup";
// import SongForm from "src/containers/SongForm";
import AddSong from "src/containers/AddSong";
import RoundImage from "src/components/RoundImage";
import OptionModal from "src/components/OptionModal";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import SongItem from "src/components/SongItem";

import {
  loadingStatus,
  updateCurrSong,
  setModalContent,
  setModalHeight
} from "src/store/actions/ActionCreator";
import { updateDoc, deleteDoc, updateVotes, getTimesTillVotable } from "src/services/api";

const db = firebase.firestore();

const Setlist = ({
  authorized,
  setModalContent,
  setModalHeight,
  loadingStatus,
  myArtist,
  navigation,
  route,
  userType,
  currSong,
  updateCurrSong
}) => {

  const artist = route.params.artist;
  const isArtist = userType === UserType.ARTIST;

  const isMountedRef = useRef(false);
  const unsubscribeArtistRef = useRef(() => { });
  const unsubscribeSongRefs = useRef([]);
  const unsubscribeShowSongsRef = useRef(null);
  const initialGetRef = useRef(true);
  const songDeleteIdRef = useRef(null);
  const allSongsRef = useRef([]);

  const [songs, setSongs] = useState([]);
  const [disabled, setDisabled] = useState({});
  const [songVotes, setSongVotes] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    processSongVotes();
    return () => {
      isMountedRef.current = false;
      unsubscribeArtistRef.current();
      unsubscribeSongRefs.current.forEach(f => f());
      unsubscribeShowSongsRef.current?.();
    };
  }, []);

  useEffect(() => {
    const processDisabledSongs = async () => {
      try {
        const timesTillVotable = await getTimesTillVotable();
        const disabledSongs = Object.keys(timesTillVotable)?.reduce((acc, songId) => {
            acc[songId] = timesTillVotable[songId].timeTillVotable.seconds > 0
          return acc;
        }, {});
        setDisabled(disabledSongs ?? {});
      } catch(err) {
      }
    };
    processDisabledSongs();
  }, []);

  useEffect(() => {
    if (!authorized && userType === "ARTIST") navigation.replace("Home");
  }, [authorized]);

  useEffect(() => {
    if (authorized && currSong) {
      const updatedSongs = songs.map(v => {
        if (v._id === currSong._id) return currSong;
        return v;
      });
      setSongs(updatedSongs);
    }
  }, [currSong, authorized]);

  const processSongVotes = useCallback(async () => {
    const showSongsCollRef = db.collection(
      `artists/${artist._id}/shows/${artist.currShowId}/songVotes`
    );

    try {
      unsubscribeShowSongsRef.current = await showSongsCollRef.onSnapshot(snapshot => {
        const showSongVotes = [];
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'modified') {
            snapshot.forEach(doc => showSongVotes.push({...doc.data(), _id: doc.id}));
            setSongVotes(showSongVotes);
          }
        });
        updateSongList(showSongVotes);
      });
    } catch(err) {
      console.log("TCL: processSongVotes -> err", err);
    }
  }, [artist._id, artist.currShowId, setSongVotes, updateSongList])

  const updateSongList = async showSongVotes => {
    loadingStatus(true);
    unsubscribeArtistRef.current = db
      .doc(`artists/${artist._id}`)
      .onSnapshot(async doc => {
        if (!doc.data() || !isMountedRef.current) return;
        let currArtistSongs = (doc.data() || {}).songs || [];

          if (isArtist) {
            currArtistSongs = currArtistSongs.sort((a, b) => {
              const votesA = showSongVotes.find(v => v._id === a._id)?.votes ?? 0;
              const votesB = showSongVotes.find(v => v._id === b._id)?.votes ?? 0;
              if (votesA < votesB) return 1;
              if (votesA > votesB) return -1;
              if (a.createdAt < b.createdAt) return -1;
              if (a.createdAt > b.createdAt) return 1;
              return 0;
            });
          }
          allSongsRef.current = currArtistSongs;
          setSongs(currArtistSongs)
          loadingStatus(false);

          if (!currArtistSongs.length) openAddForm();
      });
  };

  const showEditForm = songId => () => {
    const { title, artist } = songs.find(el => el._id === songId);
  };

  const showLyrics = songId => () => {
    const { navigate } = navigation;
    const song = songs.find(el => el._id === songId);
    updateCurrSong(song);
    navigate("Lyrics", {
      name: "Lyrics"
    });
  };

  const showVisibilityDialog = () => {
    setModalContent(
      <OptionModal
        style={styles.deleteModal}
        hideModal={hideModal}
        onConfirm={showAll}
        heading="Show All / Hide All"
        confirmText="Show All -> YES - Hide All -> NO"
      />
    );
  }

  const showAll = async visible => {
    const newSongs = allSongsRef.current.map(song => {
      song.visible = visible;
      return song;
    });
    await updateDoc("artist", {
      _id: artist._id,
      songs: newSongs
    });
    // setSongs(newSongs);
    setModalContent(null);
  }

  const changeSongVisibility = useCallback(async (_id, visible) => {
    const found = allSongsRef.current.find(song => song._id === _id) || {};
    found.visible = visible;
    await updateDoc("artist", {
      _id: artist._id,
      songs: allSongsRef.current
    });
  }, []);

  const vote = songId => async () => {
    if(!isMountedRef.current || !artist.currShowId) return;

    const songVoteCount = songVotes.find(v => v._id === songId)?.votes ?? 0;
    if (!isArtist && !authorized) { 
      setModalContent(<FanSignup />);
      return;
    }

    const toSecs = timeRemaining =>  timeRemaining.mins * 60 + timeRemaining.secs

    try {
      const res = await updateVotes({artist, songId, votes: songVoteCount+1});
      if (res?.timeRemaining) {
        const tr = res?.timeRemaining;
        setDisabled({...disabled, [songId]: toSecs(tr) > 0})
        console.log(`You can vote for this song again in ${tr.mins} mins ${tr.secs} secs`);
      }
    } catch(err) {
      console.log("vote -> err", err)
    }
  };

  const hideModal = () => setModalContent(null);

  const openAddForm = () => {
    if (isArtist) {
      setModalContent(
        <AddSong
          hideModal={hideModal}
          userArtistId={(myArtist || {})._id}
          complete={updateSongList}
          setlist={allSongsRef.current}
        />
      );
      setModalHeight(500);
    }
  };

  const renderHeaderLeft = () => (
    <View style={styles.headerIconContatiner}>
      <TouchableOpacity onPress={openAddForm}>
        <RoundImage source={addIcon} style={styles.roundImage} size={44} />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleSearch}>
        <RoundImage source={findIcon} style={styles.roundImage} size={44} />
      </TouchableOpacity>
    </View>
  );

  const renderHeaderMiddle = () => {
    const headerPreface = isArtist ? "MANAGE " : "";
    return (
      <AppText
        textStyle={{ ...styles.text, ...{ fontSize: 16, color: "white" } }}
      >
        {headerPreface}SETLIST
      </AppText>
    );
  };

  const deleteSong = id => () => {
    setModalContent(
      <OptionModal
        style={styles.deleteModal}
        onConfirm={onDeleteConfirm(id)}
        heading="DELETE SONG"
        confirmText="Are you sure you want to delete this song from SetList?"
      />
    );
    songDeleteIdRef.current = id;
  };

  const onDeleteConfirm = songId => confirm => {
    setModalContent(null);
    if (!confirm) return;
    const { _id } = artist;
    const newSongs = songs.filter(song => song._id !== songId);
    updateDoc("artist", { _id, songs: newSongs });
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const search = text => {
    const filtered =
      allSongsRef.current.filter(
        v => v.title.toLowerCase().indexOf(text.toLowerCase()) > -1
      ) || !text;

    setSongs(filtered.length ? filtered : allSongsRef.current);
  };

  return !isArtist && !artist.live ? (
    <View>
      <Text style={styles.text}>
        {`${(artist.name || "").toUpperCase()} has no current performance.`}
      </Text>
    </View>
  ) : (
    <DefaultContainer
      navigation={navigation}
      headerLeft={renderHeaderLeft()}
      headerMiddle={renderHeaderMiddle()}
      bodyPaddingTop={80}
    >
      {showSearch && (
        <AppTextInput
          style={styles.search}
          placeholder="Start typing"
          onChangeText={search}
          value=""
        />
      )}
      {!songs.length && (
        <View>
          <Text style={styles.text}>
            {`${(artist.name || "").toUpperCase()} has no current SetList.`}
          </Text>
        </View>
      )}
      {!!songs.length && (
        <View style={styles.scroll}>
          <ScrollView pagingEnabled={true}>
            {songs.map(
              song =>
                (song.visible || isArtist) && (
                    <SongItem
                      key={song._id}
                      song={song}
                      songVotes={songVotes.find(v => v._id === song._id)}
                      userType={userType}
                      disabled={disabled[song._id]}
                      vote={vote(song._id)}
                      artistLiveStatus={artist.live}
                      showEditForm={showEditForm(song._id)}
                      showLyrics={showLyrics(song._id)}
                      deleteSong={deleteSong(song._id)}
                      changeSongVisibility={changeSongVisibility}
                      showVisibilityDialog={showVisibilityDialog}
                    />
                )
            )}
          </ScrollView>
        </View>
      )}
    </DefaultContainer>
  );
};

const isEqual = (prev, next) =>
  (prev.myArtist || {})._id === (next.myArtist || {})._id &&
  prev.authorized === next.authorized;

const mapDispatchToProps = dispatch => ({
  loadingStatus: status => dispatch(loadingStatus(status)),
  updateCurrSong: song => dispatch(updateCurrSong(song)),
  setModalContent: content => dispatch(setModalContent(content)),
  setModalHeight: height => dispatch(setModalHeight(height))
});

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  myArtist: state.artist,
  userType: state.login.userType,
  currSong: state.song.currSong
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setlist);
// )(memo(Setlist, isEqual));
