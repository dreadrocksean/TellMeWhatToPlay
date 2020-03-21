import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    // margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default Button;