import React, { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: 'transparent',
    paddingBottom: 60,
  },
  form: {
    padding: 10,
  },
  input: {
    backgroundColor: '#f3f3f3',
    color: 'purple',
  },
  label: {
    marginTop: 10,
    marginBottom: 12,
  },
  labelText: {
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    height: 40,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 3,
  },
  submitButtonText:{
    color: 'white'
  },
  error: {
    color: 'red',
  },
});