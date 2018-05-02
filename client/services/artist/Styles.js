import React, { Dimensions, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 0,
    alignItems: 'center',
  },
  photoTouch: {
    width: 150,
    height: 150,
    backgroundColor: 'grey',
  },
  imageUpload: {
    marginTop: -0,
    marginBottom: 20,
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
  button: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 20,
  },
  image: {
    width: undefined,
    resizeMode: 'contain',
  },
  submitButtonText: {
    color: 'white'
  },
  h2: {
    fontSize: 13,
    fontFamily: 'montserrat-bold',
    color: 'rgba(220,220,255,0.7)',
  },
  sectionHeader: {
    // marginTop: 10,
    marginBottom: 12,
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  error: {
    color: 'red',
  },
});