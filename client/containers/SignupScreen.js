import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserFormWrapper from '../services/user/UserFormWrapper';

export default class SignupScreen extends Component {

  componentDidMount() {
    console.log('props', this.props);
  }

  render() {
    return (
      <UserFormWrapper />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
