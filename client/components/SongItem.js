import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

const SongItem = props => (
  <View style={{flexDirection: 'row'}}>
    <Text style={styles.vote}>
      {props.song.currVotes}
    </Text>
    <Button
      onPress={() => props.vote(props.song._id)}
      title={`${props.song.title} - ${props.song.author}`}
    />
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
);

const styles = StyleSheet.create({
  icon: {
    marginLeft: 15,
  },
  vote: {
    fontSize: 12,
    color: '#d00',
  },
});

export default SongItem;

