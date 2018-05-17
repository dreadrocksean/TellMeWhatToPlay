import React, { Component } from 'react';
import { ViewPropTypes, StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import icon from '../images/icons/eyeslash_icon1.png'


export default class AppTextInput extends Component {
  static defaultProps = {
    editable: true,
  };

  constructor(props) {
    super(props);
    this.togglePassword = this.togglePassword.bind(this);
    this.state = {
      showPassword: false,
    };
  }

  togglePassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  render() {
    return <View style={styles.container}>
      <TextInput
        style={[styles.input, this.props.style]}
        placeholder={this.props.placeholder}
        placeholderTextColor={this.props.placeholderTextColor || 'rgba(255,255,255,0.3)'}
        onChangeText={this.props.onChangeText}
        value={this.props.value}
        secureTextEntry={this.props.secureTextEntry && !this.state.showPassword}
        editable={this.props.editable}
      />
      {this.props.secureTextEntry && (
        <TouchableOpacity onPress={this.togglePassword}>
          <Image resizeMode='contain'
            style={styles.inputIcon} source={icon}
          />
        </TouchableOpacity>
      )}
    </View>
  }
}

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
  onChangeText: PropTypes.func,
  value: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  editable: PropTypes.bool,
};