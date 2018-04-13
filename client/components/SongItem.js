import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

import { UserType } from '../redux/reducers/LoginReducer';

const SongItem = props => {

    const {
      vote, showSong, deleteSong, showLyrics,
      liked, song, userType, artistLiveStatus
    } = props;
    const { _id, visible, title, author, currVotes } = song;

    const titleLen = title.length;
    const authorLen = author.length;
    const compTitleLength = Math.min(titleLen, 16 + 12 - Math.min(12, authorLen));
    const compAuthorLength = Math.min(authorLen, 12 + 16 - Math.min(16, titleLen));

    const isArtist = userType === UserType.ARTIST;
    console.log(isArtist, visible, artistLiveStatus);
    if (!isArtist && (!visible || !artistLiveStatus)) { return null; }

                console.log('song id', _id);

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
                // containerStyle={{width:44, height:44, backgroundColor: '#000'}}
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
  button: {
    backgroundColor: '#ddddff',
    color: 'white',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    borderColor: '#000000',
    borderWidth: 0,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,

  },
  voteWrapper: {
    position: 'absolute',
    top: -1,
    left: 4,
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 30,
    borderWidth: 0,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vote: {
    fontSize: 10,
    color: '#200',
  },
});

export default SongItem;

