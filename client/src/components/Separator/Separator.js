import React from "react";
import { StyleSheet, ViewPropTypes, Text, View } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles.js";
import AppText from "src/components/AppText";

const Separator = ({ style, label }) => {
  const renderLine = () => <View style={styles.hr} />;

  return (
    <View style={{ ...styles.root, ...style }}>
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
  label: PropTypes.string,
  style: PropTypes.object
};

export default Separator;
