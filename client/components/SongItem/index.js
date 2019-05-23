import React, { Component, Fragment } from "react";
import {
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
  Button,
  View
} from "react-native";
import { Button as RNButton, Icon } from "react-native-elements";

import { styles } from "./styles";
import Score from "./Score";
import ListItemIcon from "./ListItemIcon";
import ListItem from "../ListItem/";
import AppText from "../AppText";
import { UserType } from "../../redux/reducers/LoginReducer";
import lyricsIcon from "../../images/icons/lyrics_btn1.png";
import voteUpIcon from "../../images/icons/vote_up_btn.png";
import voteDownIcon from "../../images/icons/vote_down_btn.png";
import artistThumb from "../../images/icons/artist_thumb.png";
import muteButton from "../../images/buttons/mute_btn.png";
import unmuteButton from "../../images/buttons/unmute_btn.png";
import trashButton from "../../images/buttons/trash_btn.png";

class SongItem extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isArtist: props.userType === UserType.ARTIST,
      muted: !props.song.visible
    };
  }

  changeSongVisibility = () => {
    this.props.changeSongVisibility(this.props.song._id, this.state.muted);
    this.setState({ muted: !this.state.muted });
  };

  onDeleteSong = () => this.props.onDeleteSong(this.props.song._id);

  renderArtistSongItem = () => {
    const { showLyrics, song } = this.props;
    const { _id, title, artist } = song;
    const currVotes = this.props.song.currVotes || 0;
    const { muted } = this.state;
    const titleColor = muted ? "#4d4d4d" : "#3c2385";

    return (
      <Fragment>
        <View style={styles.leftInfo}>
          <Score short={true} votes={currVotes} disabled={muted} />
          <ListItemIcon onPress={showLyrics} icon={lyricsIcon} />
          <View style={styles.info}>
            <AppText
              textStyle={[styles.text, { color: titleColor, fontSize: 16 }]}
            >
              {title}
            </AppText>
            <AppText textStyle={[styles.text, { color: "#999", fontSize: 11 }]}>
              {artist}
            </AppText>
          </View>
        </View>

        <View style={styles.rightInfo}>
          <ListItemIcon
            onPress={this.changeSongVisibility}
            icon={muted ? unmuteButton : muteButton}
          />
          <ListItemIcon onPress={this.onDeleteSong} icon={trashButton} />
        </View>
      </Fragment>
    );
  };

  renderFanSongItem = () => {
    const { vote, liked, showLyrics, song } = this.props;
    const { _id, title, artist } = song;
    const currVotes = song.currVotes || 0;

    return (
      <Fragment>
        <View style={styles.leftInfo}>
          <ListItemIcon onPress={showLyrics} icon={lyricsIcon} />
          <View style={styles.info}>
            <AppText
              textStyle={[styles.text, { color: "#3c2385", fontSize: 16 }]}
            >
              {title}
            </AppText>
            <AppText
              textStyle={[styles.text, { color: "#ff3a80", fontSize: 11 }]}
            >
              {artist}
            </AppText>
          </View>
        </View>

        <View style={styles.rightInfo}>
          <View style={styles.scoreContainer}>
            <Score votes={currVotes} />
          </View>
          <ListItemIcon
            onPress={vote(_id, currVotes, !liked)}
            icon={voteUpIcon}
            styles={styles.voteIcon}
            tint={liked}
          />
        </View>
      </Fragment>
    );
  };

  render() {
    const { artistLiveStatus, song } = this.props;
    const { visible } = song;
    const showSong = this.state.isArtist || (visible && artistLiveStatus);
    if (!showSong) {
      return null;
    }

    return (
      <View>
        <ListItem disabled={!visible}>
          {this.state.isArtist
            ? this.renderArtistSongItem()
            : this.renderFanSongItem()}
        </ListItem>
      </View>
    );
  }
}

export default SongItem;
