import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import {
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
  Button,
  View
} from "react-native";
import { Button as RNButton, Icon } from "react-native-elements";

import styles from "./styles";
import Score from "./Score";
import ListItemIcon from "./ListItemIcon";
import ListItem from "src/components/ListItem/";
import AppText from "src/components/AppText";
import { UserType } from "src/store/reducers/LoginReducer";
import lyricsIcon from "src/images/icons/lyrics_btn1.png";
import voteUpIcon from "src/images/icons/vote_up_btn.png";
import voteDownIcon from "src/images/icons/vote_down_btn.png";
import artistThumb from "src/images/icons/artist_thumb.png";
import muteButton from "src/images/buttons/mute_btn.png";
import unmuteButton from "src/images/buttons/unmute_btn.png";
import trashButton from "src/images/buttons/trash_btn.png";

const SongItem = ({
  navigation,
  userType,
  song,
  songVotes = {},
  deleteSong,
  showLyrics,
  vote,
  disabled,
  artistLiveStatus,
  changeSongVisibility,
  showVisibilityDialog
}) => {
  const [isArtist, setIsArtist] = useState(userType === UserType.ARTIST);

  const handleChangeSongVisibility = () => {
    changeSongVisibility(song._id, !song.visible);
  };

  const renderArtistSongItem = () => {
    const { _id, title, artist } = song;
    const currVotes = songVotes.votes || 0;
    const titleColor = song.visible ? "#3c2385" : "#4d4d4d";

    return (
      <View style={styles.root}>
        <View style={styles.itemLeft}>
          <Score short={true} votes={currVotes} disabled={!song.visible} />
          {!song.visible && <ListItemIcon onPress={showLyrics} icon={lyricsIcon} />}
        </View>
        <View style={styles.itemInfo}>
          <AppText
            numberOfLines={2}
            textStyle={{
              ...styles.text,
              ...styles.titleText,
              color: titleColor
            }}
          >
            {title}
          </AppText>
          <AppText textStyle={{ ...styles.text, ...styles.artistText }}>
            {artist}
          </AppText>
        </View>

        <View style={styles.itemRight}>
          <ListItemIcon
            onPress={handleChangeSongVisibility}
            onLongPress={showVisibilityDialog}
            icon={song.visible ? unmuteButton : muteButton}
          />
          <ListItemIcon onPress={deleteSong} icon={trashButton} />
        </View>
      </View>
    );
  };

  const renderFanSongItem = () => {
    const { _id, title, artist } = song;
    const currVotes = songVotes.votes || 0;

    return (
      <View style={styles.root}>
        {/* <View style={{ ...styles.itemLeft, flex: 4 }}>
          <ListItemIcon onPress={showLyrics} icon={lyricsIcon} />
        </View> */}

        <View style={{ ...styles.itemInfo, flex: 20 }}>
          <AppText
            numberOfLines={2}
            textStyle={{
              ...styles.text,
              ...styles.titleText,
              color: "#3c2385"
            }}
          >
            {title}
          </AppText>
          <AppText
            textStyle={{
              ...styles.text,
              ...styles.artistText,
              color: "#ff3a80"
            }}
          >
            {artist}
          </AppText>
        </View>

        <View style={styles.itemRight}>
          <View style={styles.scoreContainer}>
            <Score votes={currVotes} />
          </View>
          <ListItemIcon
            onPress={vote}
            icon={voteUpIcon}
            styles={styles.voteIcon}
            tint={disabled}
            disabled={!vote}
          />
        </View>
      </View>
    );
  };

  const showSong = isArtist || (song.visible && artistLiveStatus);

  return showSong ? (
    <ListItem disabled={!song.visible} onClick={showLyrics}>
      {isArtist ? renderArtistSongItem() : renderFanSongItem()}
    </ListItem>
  ) : null;
};

SongItem.defaultProps = {};

const areEqual = (prev, next) =>
  // prev._id === next._id &&
  prev.songVotes.votes === next.songVotes.votes &&
  prev.song.artist === next.song.artist &&
  prev.song.title === next.song.title &&
  prev.disabled === next.disabled;

export default SongItem;
// export default memo(SongItem, areEqual);
