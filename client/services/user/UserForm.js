import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, Image, TouchableOpacity, View , Dimensions} from 'react-native';

import styles from './Styles';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import signupButton from '../../images/buttons/signup_btn.png';
import loginButton from '../../images/buttons/login_btn.png';
import eyeslashIcon from '../../images/icons/eyeslash_icon1.png';

const UserForm = (props) => {
  const {hasAccount, onHasAccountChange, handleChange, fieldValues,
    onSubmit, errorMessage, togglePassword, hidePassword
  } = props;
  console.log('UserForm fieldValues', fieldValues);
  const { email, password, fname, lname, zip } = props.fieldValues;
  const fields = [
    {
      placeholder: 'Email', value: email,
      onChange: val => handleChange({email: val})
    },
    {
      placeholder: 'Password', value: password, icon: eyeslashIcon,
      onChange: val => handleChange({password: val}),
      hidePassword
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
          fields
            .filter(f => (
              f.placeholder === 'Email' ||
              f.placeholder === 'Password' ||
              !hasAccount
            ))
            .map((field, i) => (
              <AppTextInput key={i} 
                placeholder={field.placeholder}
                onChangeText={field.onChange}
                value={field.value}
                secureTextEntry={field.placeholder === 'Password'}
              />
          ))
        }
        <View>
          <TouchableOpacity
            onPress={ () => (
              onSubmit(hasAccount ? 'LogIn' : 'SignUp')
            )}>
            <Image source={
              hasAccount ? loginButton : signupButton
            } />
          </TouchableOpacity>
          <AppText
            style={styles.label}
            textStyle={styles.labelText}
          >
            {hasAccount ? 'DON\'T' : 'ALREADY'} HAVE AN ACCOUNT?
          </AppText>
          <TouchableOpacity
            onPress={ () => onHasAccountChange(!hasAccount) }>
            <AppText>{hasAccount ? 'SIGNUP' : 'LOGIN'}</AppText>
          </TouchableOpacity>
        </View>
        <AppText textStyle={styles.error}>{errorMessage}</AppText>
      </View>
    </View>
)};

export default UserForm;

