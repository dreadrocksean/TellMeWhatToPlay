import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, Text, View } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles.js";
import AppText from "src/components/AppText";

const Separator = ({ label }) => {
  const renderLine = () => <View style={styles.hr} />;

  return (
    <View style={styles.container}>
      {renderLine()}
      {label && (
        <AppText textStyle={styles.labelText} style={styles.label}>
          {label}
        </AppText>
      )}
      {renderLine()}
    </View>
  );
};

Separator.propTypes = {
  label: PropTypes.string
};

export default Separator;
