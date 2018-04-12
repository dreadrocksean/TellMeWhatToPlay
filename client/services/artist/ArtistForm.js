import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';

import styles from './Styles';

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
        <Text style = {styles.submitButtonText}> {submitText || 'Submit'} </Text>
      </TouchableOpacity>
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
};

export default ArtistForm;

