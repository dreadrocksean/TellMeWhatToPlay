import React from 'react';
import { Dimensions, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import AppText from '../AppText';
import closeIcon from '../../images/icons/close_icon.png';

const { width, height } = Dimensions.get('window');

const Modal = props => {

  return (
    <View style={styles.container}>
      <View style={[styles.window, props.styles]}>
        {props.children}
        {!props.hideCloseButton && (
          <TouchableOpacity
            style={styles.closeWrapper}
            onPress = {props.dismiss}
          >
            <Image
              source={closeIcon}
              style={styles.close}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

};

export default Modal;