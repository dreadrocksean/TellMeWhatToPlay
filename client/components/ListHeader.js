import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import Logo from '../images/logo.png';

const ListHeader = props => {
  return (
    <View style={styles.container}>
      {props.children || <View />}
      <TouchableOpacity style={styles.logoWrap} onPress={props.home} >
        <Image style={styles.logo}
          source={Logo}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // backgroundColor: 'rgba(220,220,255,0.9)',
    height: 70,
  },
  logoWrap: {
    // alignSelf: 'flex-end',
    height: 70,
    width: 70,
  },
  logo: {
    flex: 1,
    height: null,
    width: null,
  },
});

