import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';
import AppText from '../AppText';

const Score = props => {

  const disabledStyles = props.disabled ? {backgroundColor: '#999'} : null;

  return (
    <View style={[styles.score, disabledStyles]}>
      <View style={styles.scoreIcon}>
        { props.icon ?
          (<Image source={props.icon} style={styles.gImage} />)
          : (<View />)
        }
      </View>
      <AppText
        textStyle={[styles.text, styles.scoreText]}>{props.votes}</AppText>
    </View>
  );

};

export default Score;