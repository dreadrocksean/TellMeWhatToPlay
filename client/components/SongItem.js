import React from 'react';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Image, Text, Button, View } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

import { UserType } from '../redux/reducers/LoginReducer';
import {listItemStyle} from '../styles/listItemStyle';
import lyricsIcon from '../images/list/lyrics_btn1.png';
import voteIcon from '../images/list/vote_btn1.png';

const SongItem = props => {

    const {
      vote, showSong, deleteSong, showLyrics,
      liked, song, userType, artistLiveStatus
    } = props;
    const { _id, visible, title, author, currVotes } = song;

    const isArtist = userType === UserType.ARTIST;
    if (!isArtist && (!visible || !artistLiveStatus)) { return null; }

  return <View style={styles.itemContainer}>
    <View style={styles.item}>
      <View
        style={styles.button}
      >
        <View style={styles.content} >
      
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
              <Text style={{color:'#3c2385', fontWeight: 'bold', fontSize: 16}}>{title}</Text>
              <Text style={{color:'#ff3a80', fontWeight: 'bold', fontSize: 11}}>{author}</Text>
            </View>
          </View>

          <View style={styles.rightInfo} >
            <View style={styles.scoreContainer}>
              <View style={styles.score}>
                <Text style={styles.scoreText}>{currVotes}</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={()=>vote(_id, !liked)}
            >
              <Image style={[styles.image, styles.voteIcon]}
                source={voteIcon}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  </View>

  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Button styles={styles.button}
          onPress={showLyrics}
          disabled={!visible}
          title={`${title.substring(0, compTitleLength).trim()} - ${author.substring(0, compAuthorLength).trim()}`}
        />
        {currVotes > 0 && isArtist &&
          <View style={styles.voteWrapper}>
            <Text style={styles.vote}>
              {currVotes}
            </Text>
          </View>
        }
      </View>
      <View style={styles.iconGroup}>
        {!isArtist && (
          <View style={styles.iconGroup}>
            <Icon
              iconStyle={styles.icon}
              onPress={() => {
              console.log('song id', _id);
                vote(_id, !liked);
              }}
              name='thumb-up'
              type='material-community'
              color={liked ? "#99f" : "#d4d4d4"}
              size={44}
            />
            <View style={[
              styles.voteWrapper,
              {
                position: 'relative',
                backgroundColor: '#d00',
                marginLeft: 15,
                borderWidth: 1,
                top: 0,
                left: 0,
              }
            ]}>
              <Text style={[
                styles.vote.fan,
                {
                  color: '#fff',
                  // width: 44,
                  // height: 44,
                  // borderRadius: 44,
                },
              ]}>
                {currVotes}
              </Text>
            </View>
          </View>
        )}
        {isArtist && (
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
        )}
      </View>
    </View>
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

