import React, { Fragment } from 'react';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Image, Text, Button, View } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

import ListItem from '../components/ListItem/';
import AppText from '../components/AppText';
import { UserType } from '../redux/reducers/LoginReducer';
import listItemStyle from './ListItem/styles';
import lyricsIcon from '../images/icons/lyrics_btn1.png';
import voteUpIcon from '../images/icons/vote_up_btn.png';
import voteDownIcon from '../images/icons/vote_down_btn.png';

const SongItem = props => {

  const {
    vote, liked, showSong, deleteSong, showLyrics,
    song, userType, artistLiveStatus
  } = props;
  const { _id, visible, title, author, currVotes } = song;

  const isArtist = userType === UserType.ARTIST;
  if (!isArtist && (!visible || !artistLiveStatus)) { return null; }

  const renderArtistSongItem = () => (
    <View style={styles.iconGroup}>
      <Icon
        iconStyle={styles.icon}
        onPress={() => showSong(_id, !visible)}
        name='eye-slash'
        type='font-awesome'
        color={visible ? "#9999ff" : "#d4d4d4"}
        size={44}
      />
      <Icon
        iconStyle={styles.icon}
        onPress={() => deleteSong(_id)}
        name='trash'
        type='font-awesome'
        color="#d4d4d4"
        size={44}
      />
    </View>
  );

  const renderFanSongItem = () => (
    <Fragment>
      <View style={styles.leftInfo} >
        <TouchableOpacity
          onPress={showLyrics}
        >
          <View>
            <Image style={styles.image}
              source={lyricsIcon}
              resizeMode={'cover'}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.info}>
          <AppText
            textStyle={[styles.text, {color:'#3c2385', fontSize: 16}]}
          >{title}</AppText>
          <AppText
            textStyle={[styles.text, {color:'#ff3a80', fontSize: 11}]}
          >{author}</AppText>
        </View>
      </View>
      
      <View style={styles.rightInfo} >
        <View style={styles.scoreContainer}>
          <View style={styles.score}>
            <AppText
              textStyle={[styles.text, styles.scoreText]}>{currVotes}</AppText>
          </View>
        </View>
        <TouchableOpacity 
          onPress={()=>vote(_id, !liked)}
        >
          <Image style={[styles.image, styles.voteIcon]}
            source={liked ? voteDownIcon : voteUpIcon}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
      </View>
    </Fragment>
  );

  return (
    <ListItem disabled={!visible}>
      { isArtist ? renderArtistSongItem() : renderFanSongItem() }
    </ListItem>
  );
};

const styles = StyleSheet.create({
  ...listItemStyle,
  image: {
    width: 40,
    height: 40,
  },
  voteIcon: {
    marginRight: 36,
  },
  scoreContainer: {
    position: 'absolute',
    right: 0,
    height: 40,
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,255,0.3)',
  },
  text: {
    fontWeight: 'normal',
    textAlign: 'left',
    fontFamily: 'montserrat-regular',
  },
  score: {
    right: 0,
    backgroundColor: '#fcc819',
    height: 20,
    width: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  scoreText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    // backgroundColor: 'rgba(0,0,255,0.3)',
  },
});

export default SongItem;

