import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { styles } from './styles';

const AppImage = ({ source, style, width, height }) => {

  return (
    <Image
      source={source}
      style={[style, styles.image]}
    />
  )
};

export default AppImage;