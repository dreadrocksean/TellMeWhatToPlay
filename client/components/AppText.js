import React, { Component } from 'react';
import { ViewPropTypes, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const AppText = ({ style, textStyle, children }) => (
  <View style={style}>
    <Text style={[styles.text, textStyle]}>
      {children}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'montserrat-bold',
    color: 'rgba(220,220,255,0.9)',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  }
});

AppText.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    ViewPropTypes.style,
  ]),
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  children: PropTypes.any.isRequired,
};

export default AppText;