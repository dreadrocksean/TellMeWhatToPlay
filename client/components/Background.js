import React from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import bg from '../images/bg.png';

const Background = () => (
	<Image source={bg} style={styles.backgroundImage} />
)

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    resizeMode: 'cover',
  },
});


export default Background;