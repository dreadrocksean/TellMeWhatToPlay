import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

const ArtistItem = props => {

    return <View style={styles.item}>
      <View style={styles.info}>
        <Button
          title={props.artist.name}
          onPress={props.showSetList}
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
});

export default ArtistItem;

