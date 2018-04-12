import React, { Dimensions, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 22,
    height: height / 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  autocomplete: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    fontSize: 20,
    padding: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  input: {
    position: 'relative',
    fontSize: 20,
    padding: 5,
    height: 40,
    width: width * 0.8,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#7a42f4',
    padding: 10,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  },
  error: {
    color: 'red',
  },
});