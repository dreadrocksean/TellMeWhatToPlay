import React, { Component } from "react";
import { ViewPropTypes, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const AppText = ({ style, textStyle, numberOfLines, children }) => (
  <View style={[style, { justifyContent: "center" }]}>
    <Text style={[styles.text, textStyle]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "montserrat-bold",
    color: "rgba(220,220,255,0.9)",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  }
});

AppText.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    ViewPropTypes.style
  ]),
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
  numberOfLines: PropTypes.number,
  children: PropTypes.any
};

export default AppText;
