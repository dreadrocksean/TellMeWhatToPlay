import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View , Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const UserForm = ({
  handleChange, command, email, password, onSubmit, errorMessage
}) => {

  const onHandleChange = field => {
    handleChange(field);
  };

  return (
    <View style={styles.form}>
      <View>
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={email => onHandleChange({email})}
          value={email}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder='Password'
          onChangeText={password => onHandleChange({password})}
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
  );

};

const styles = StyleSheet.create({
  form: {
    height: 200,
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    position: 'relative',
    fontSize: 20,
    padding: 5,
    height: 40,
    width: width * 0.8,
    alignSelf: 'stretch',
    borderColor: '#7a42f4',
    borderWidth: 1,
    marginBottom: 10,
  },
  submits: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  },
  error: {
    color: 'red',
  }
});

export default UserForm;

