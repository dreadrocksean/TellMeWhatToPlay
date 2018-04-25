import React, { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    marginTop: 15,
  },
  form: {
    padding: 10,
  },
  inputWrap: {
    flexDirection: 'row',
  },
  input: {
    color: 'white',
    flex: 1,
    fontSize: 20,
    padding: 5,
    paddingLeft: 15,
    height: 60,
    borderColor: '#7a42f4',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 15,

  },
  inputIcon: {
    width: 25,
    height: 60,
    position: 'absolute',
    right: 15,
    opacity: 0.5,
    // backgroundColor: 'grey',
  },
  label: {
    color: 'rgba(230,230,255,0.7)',
    marginTop: 10,
    marginBottom: 12,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submits: {
    // flex: 1,
    // alignSelf: 'stretch',
    // flexDirection: 'row',
    justifyContent: 'space-around',
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
  }
});