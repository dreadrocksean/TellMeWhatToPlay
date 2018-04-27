import React, { Component } from 'react';
import { StyleSheet, ViewPropTypes, Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Check from '../images/icons/check_icon.png';
import AppText from '../components/AppText';

const CheckBox = ({ toggle, checked, label, disabled }) => {

  const disabledStyles = disabled
    ? {
      opacity: 0.5,
    }
    : {};
  return (
    <TouchableOpacity style={styles.container}
      onPress={disabled ? null : toggle}
      activeOpacity={disabled ? 1 : 0.2}
    >
      <View style={[styles.box, disabledStyles]}>
        {checked && (
          <Image style={styles.image} source={Check} />
        )}
      </View>
      <AppText
        textStyle={styles.labelText}
        style={[styles.label, disabledStyles]}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    width: 25,
    height: 25,
    padding: 3,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  label: {
    marginLeft: 7,
  },
  labelText: {
    color: 'white',
    fontSize: 12,
  },
});

CheckBox.propTypes = {
  toggle: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CheckBox;