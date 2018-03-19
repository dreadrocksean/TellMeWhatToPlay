import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

const SongItem = props => (
  <View style={styles.item}>
    <View style={styles.info}>
      <Text style={styles.vote}>
        {props.song.currVotes}
      </Text>
      <Button
        onPress={() => props.vote(props.song._id)}
        title={`${props.song.title.substring(0, 15)} - ${props.song.author.substring(0, 14)}`}
      />
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
);

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
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  vote: {
    fontSize: 12,
    color: '#d00',
  },
});

export default SongItem;

