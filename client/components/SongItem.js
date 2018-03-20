import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

const SongItem = props => {
    const titleLen = props.song.title.length;
    const authorLen = props.song.author.length;
    const compTitleLength = Math.min(titleLen, 16 + 13 - Math.min(13, authorLen));
    const compAuthorLength = Math.min(authorLen, 13 + 16 - Math.min(16, titleLen));

    return <View style={styles.item}>
      <View style={styles.info}>
        <Button
          onPress={() => props.vote(props.song._id)}
          title={`${props.song.title.substring(0, compTitleLength).trim()} - ${props.song.author.substring(0, compAuthorLength).trim()}`}
        />
        {props.song.currVotes > 0 && 
          <View style={styles.voteWrapper}>
            <Text style={styles.vote}>
              {props.song.currVotes}
            </Text>
          </View>
        }
      </View>
      <View style={styles.iconGroup}>
        <Icon
          iconStyle={styles.icon}
          onPress={props.showEditForm}
          name='lead-pencil'
          type='material-community'
          color="#d4d4d4"
        />
        <Icon
          iconStyle={styles.icon}
          onPress={() => props.deleteSong(props.song._id)}
          name='trash'
          type='font-awesome'
          color="#d4d4d4"
        />
      </View>
    </View>
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    borderColor: '#000000',
    // borderWidth: 1,
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
    // backgroundColor: '#d00',
    // opacity: 0.3,
    position: 'absolute',
    top: -1,
    left: 4,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 30,
    // borderWidth: 1,
    borderColor: '#000000',
    // width: 15,
    // height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vote: {
    fontSize: 10,
    color: '#200',

  },
});

export default SongItem;

