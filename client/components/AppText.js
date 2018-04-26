import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AppText extends Component {

  render() {
    return (
      <View style={this.props.style}>
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'montserrat-bold',
    color: 'rgba(220,220,255,0.9)',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  }
});