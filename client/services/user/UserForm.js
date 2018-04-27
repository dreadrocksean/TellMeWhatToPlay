import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, Image, TouchableOpacity, View , Dimensions} from 'react-native';

import styles from './Styles';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import signupButton from '../../images/buttons/signup_btn.png';
import loginButton from '../../images/buttons/login_btn.png';
import eyeslashIcon from '../../images/icons/eyeslash_icon1.png';

const UserForm = (props) => {
  const {handleChange, email, password, fname, lname, zip,
    onSubmit, errorMessage, togglePassword, hidePassword
  } = props;
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
          fields.map((field, i) => (
            <AppTextInput key={i} 
              placeholder={field.placeholder}
              onChangeText={field.onChange}
              value={field.value}
              secureTextEntry={field.hidePassword}
              icon={field.icon}
            />
          ))
        }
        <View style={styles.submits}>
          <TouchableOpacity
            onPress={ () => onSubmit('SignUp') }>
            <Image
              source={signupButton}
            />
          </TouchableOpacity>
          <AppText
            style={styles.label}
            textStyle={styles.labelText}
          >ALREADY HAVE AN ACCOUNT? </AppText>
          <TouchableOpacity
            onPress={ () => onSubmit('LogIn') }>
            <Image
              source={loginButton}
            />
          </TouchableOpacity>
        </View>
        <AppText textStyle={styles.error}>{errorMessage}</AppText>
      </View>
    </View>
)};

export default UserForm;

