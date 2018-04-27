import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';

import styles from './Styles';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import CheckBox from '../../components/CheckBox';
import RadioButton from '../../components/RadioButton';

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
      <CheckBox checked={this.state.checkbox || false} toggle={this.toggleCheckbox.bind(this)} label='TESTCHECKBOX' />
      <RadioButton checked={this.state.radioButton || false} toggle={this.toggleRadioButton.bind(this)} label='TESTRADIOBTN' />
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

