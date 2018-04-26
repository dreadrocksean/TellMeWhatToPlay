import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';

import styles from './Styles';
import AppText from '../../components/AppText';

const ArtistForm = ({
  handleChange,
  artistName,
  onSubmit,
  artistNameComplete,
  submitText,
  errorMessage,
}) => {

  return (
    <View style={styles.container}>
      <View style={{flex: 4}}>
        <TextInput
          style={styles.autocomplete}
          placeholder={artistNameComplete || ''}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder='Artist Name'
          onChangeText={artistName => handleChange({artistName})}
          value={artistName}
        />
      </View>
      <TouchableOpacity
        style = {styles.submitButton}
        onPress = { () => onSubmit() }>
        <AppText textStyle={styles.submitButtonText}> {submitText || 'Submit'} </AppText>
      </TouchableOpacity>
      <AppText textStyle={styles.error}>{errorMessage}</AppText>
    </View>
  );
};

export default ArtistForm;

