import React, { Component } from 'react';
import { ViewPropTypes, StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const AppTextInput = props => {
  const defaultProps = {
    editable: false,
  }; 
  return <View style={styles.container}>
    <TextInput
      style={[styles.input, props.style]}
      placeholder={props.placeholder}
      placeholderTextColor='rgba(255,255,255,0.3)'
      onChangeText={props.onChangeText}
      value={props.value}
      secureTextEntry={props.hidePassword}
      editable={props.editable}
    />
    {props.icon && (
      <TouchableOpacity onPress={props.togglePassword}>
        <Image resizeMode='contain'
          style={styles.inputIcon} source={props.icon}
        />
      </TouchableOpacity>
    )}
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'montserrat-bold',
    color: 'rgba(220,220,255,0.9)',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
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
});

AppTextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  editable: PropTypes.bool,
};

export default AppTextInput;