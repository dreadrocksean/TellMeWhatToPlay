import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View , Dimensions} from 'react-native';

import styles from './Styles';

const UserForm = (props) => {
  const {handleChange, email, password, onSubmit, errorMessage} = props;
  // console.log('props', props);
  // console.log('handleChange', handleChange);
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Email'
            onChangeText={email => handleChange({email})}
            value={email}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Password'
            onChangeText={password => handleChange({password})}
            value={password}
          />
        </View>
        <View style={styles.submits}>
          <TouchableOpacity
            style = {styles.submitButton}
            onPress = { () => onSubmit('LogIn') }>
            <Text style = {styles.submitButtonText}> Log In </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.submitButton}
            onPress = { () => onSubmit('SignUp') }>
            <Text style = {styles.submitButtonText}> Sign Up </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </View>
)};

export default UserForm;

