import React, { Component } from 'react';
import {
  Dimensions, StyleSheet, Image, Text, View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const RoundImage = props => {
  if (!props.style.size) {return null;}
  console.log('RoundImage why am I here?', props.style.size);
  const size = {
    width: props.style.size,
    height: props.style.size,
    borderRadius: props.style.size / 2,
  };
  delete props.style.size;
  return (
    <View style={[styles.avatarContainer, size, props.style]}>
      <Image style={styles.avatarImage}
        source={props.source}
      />
    </View>
)};

const styles = StyleSheet.create({
  avatarContainer: {
    // flex: 1,
    overflow: 'hidden',
    borderColor: '#ff3a80',
    borderWidth: 2,
  },
  avatarImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});

export default RoundImage;