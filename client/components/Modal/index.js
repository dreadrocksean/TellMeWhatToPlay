import React from 'react';
import { Dimensions, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

const { width, height } = Dimensions.get('window');

const Modal = props => {

  return (
    <View style={styles.container}>
      <View style={styles.window}>{props.children}</View>
    </View>
  );


  <Modal style={styles.modalContainer}
    isVisible={showModal}
    backdropColor={'#000'}
    backdropOpacity={0.7}
    animationIn={'zoomInDown'}
    animationOut={'zoomOutUp'}
    animationInTiming={1000}
    animationOutTiming={1000}
    backdropTransitionInTiming={1000}
    backdropTransitionOutTiming={1000}
  />

};

export default Modal;