import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, Image, TouchableOpacity, View , Dimensions} from 'react-native';

import styles from './Styles';
import signupButton from '../../images/buttons/signup_btn.png';
import loginButton from '../../images/buttons/login_btn.png';
import eyeslashIcon from '../../images/icons/eyeslash_icon1.png';

const UserForm = (props) => {
  const {handleChange, email, password, fname, lname, zip,
    onSubmit, errorMessage, togglePassword, showPassword
  } = props;
  const fields = [
    {
      placeholder: 'Email', value: email,
      onChange: val => handleChange({email: val})
    },
    {
      placeholder: 'Password', value: password, icon: eyeslashIcon,
      onChange: val => handleChange({password: val}),
      showPassword
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
            <View style={styles.inputWrap} key={i} >
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor='rgba(255,255,255,0.3)'
                onChangeText={field.onChange}
                value={field.value}
                secureTextEntry={!showPassword}
              />
              {field.icon && (
                <TouchableOpacity onPress={togglePassword}>
                  <Image resizeMode='contain'
                    style={styles.inputIcon} source={field.icon}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))
        }
        <View style={styles.submits}>
          <TouchableOpacity
            onPress={ () => onSubmit('LogIn') }>
            <Image
              source={loginButton}
            />
          </TouchableOpacity>
          <Text style={styles.label}>ALREADY HAVE AN ACCOUNT?</Text>
          <TouchableOpacity
            onPress={ () => onSubmit('SignUp') }>
            <Image
              source={signupButton}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </View>
)};

export default UserForm;

