import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View , Dimensions} from 'react-native';

import styles from './Styles';

const UserForm = (props) => {
  const {handleChange, email, password, fname, lname, zip,
    onSubmit, errorMessage
  } = props;
  const fields = [
    {
      placeholder: 'Email', value: email,
      onChange: val => handleChange({email: val})
    },
    {
      placeholder: 'Password', value: password,
      onChange: val => handleChange({password: val})
    },
    {
      placeholder: 'First Name', value: fname,
      onChange: val => handleChange({fname: val})
    },
    {
      placeholder: 'Last Name', value: lname,
      onChange: val => handleChange({lname: val})
    },
    {
      placeholder: 'Zip Code', value: zip,
      onChange: val => handleChange({zip: val})
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {
          fields.map((field, i) => (
            <View key={i}>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor='rgba(255,255,255,0.3)'
                onChangeText={field.onChange}
                value={field.value}
              />
            </View>
          ))
        }
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

