import React from 'react';
import { Dimensions, StyleSheet, Text, Button, View, Image, TouchableHighlight } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

import listItemBg from '../images/list/list_btn.png';
import listItemAvatar from '../images/list/test_avatar.png';
import listItemMarker from '../images/list/marker.png';

const { width, height } = Dimensions.get('window');
const ArtistItem = props => {
  const {
    name='Lindsey Stroud',
    genre='Alternative Hiphop',
    instruments=['Singer Songwriter']
  } = props.artist;
    return <View style={styles.itemContainer}>
      {/*<Image style={styles.background}
        source={listItemBg}
        resizeMode={'contain'}
      />*/}
      <View style={styles.item}>
        <TouchableHighlight
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
        </TouchableHighlight>
      </View>
    </View>
};
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 22,
    borderColor: 'white',
    borderWidth: 4,
    borderBottomWidth: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 8,
    // overflow: 'hidden',
  },
  item: {
    flex: 1,
    height: 62,
    borderRadius: 22,
    backgroundColor: '#fff6d8',
    shadowColor: '#edbc78',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  // background: {
  //   height: 70,
  //   marginLeft: -350,
  // },
  button: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '92%', // account for bottom shadow
    // backgroundColor: 'rgba(0,0,255,0.3)',
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 55,
    height: 55,
    borderRadius: 55,
    borderColor: '#ff3a80',
    borderWidth: 2,
    overflow: 'hidden', 
  },
  markerContainer: {
    width: 10,
    marginRight: 2,
    // backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
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

