import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import Logo from '../images/logo.png';
import AppText from '../components/AppText';

const ListHeader = props => {
  const test = <AppText>OPTIONS</AppText>;
  return (
    <View style={styles.component}>
      <View style={styles.children}>{props.children}</View>
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
  component: {
    padding: 0,
    paddingBottom: 0,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'rgba(220,220,255,0.9)',
    height: 45,
    // overflow: 'hidden',
  },
  logoWrap: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 10,
    // backgroundColor: 'grey',
    height: 50,
    width: 50,
  },
  logo: {
    flex: 1,
    height: null,
    width: 55,
  },
  children: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

