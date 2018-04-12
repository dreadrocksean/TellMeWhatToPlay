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
  form: {
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