import React from 'react';
import { Dimensions, StyleSheet, Text, Button, View, Image, TouchableOpacity } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

import listItemBg from '../images/list/list_btn.png';
import listItemAvatar from '../images/list/test_avatar.png';
import listItemMarker from '../images/list/marker.png';
import {listItemStyle} from '../styles/listItemStyle';

const { width, height } = Dimensions.get('window');
const ArtistItem = props => {
  const {
    name='Lindsey Stroud',
    genre='Alternative Hiphop',
    instruments=['Singer Songwriter']
  } = props.artist;
  console.log('styles', styles);
  return <View style={styles.itemContainer}>
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.button}
        onPress={props.showSetList}
        disabled={!props.artist.live}
      >
        <View style={styles.content} >
      
          <View style={styles.leftInfo} >
            <View style={styles.avatarContainer} >
              <Image style={styles.image}
                source={listItemAvatar}
                resizeMode={'cover'}
              />
            </View>
            <View style={styles.info}>
              <Text style={{color:'#3c2385', fontWeight: 'bold', fontSize: 16}}>{name}</Text>
              <Text style={{color:'#ff3a80', fontWeight: 'bold', fontSize: 11}}>{genre}</Text>
              <Text style={{color:'#9c9c9c', fontWeight: 'bold', fontSize: 11}}>{instruments.join(' | ')}</Text>
            </View>
          </View>
          <View style={styles.rightInfo} >
            <View style={styles.markerContainer} >
              <Image style={styles.image}
                source={listItemMarker}
                resizeMode={'contain'}
              />
            </View>
            <Text style={{color:'#35a3de', fontWeight: 'bold', fontSize: 11}}>{'25 KM'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  </View>
};
const styles = StyleSheet.create({
  ...listItemStyle,
  avatarContainer: {
    width: 55,
    height: 55,
    borderRadius: 55,
    borderColor: '#ff3a80',
    borderWidth: 2,
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    width: 10,
    marginRight: 2,
  },
  info: {
    marginLeft: 15,
    justifyContent: 'space-around',
  },
  icon: {
    marginLeft: 15,
  },
});

export default ArtistItem;

