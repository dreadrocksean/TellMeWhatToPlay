import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, Image, TouchableOpacity, View } from 'react-native';

import styles from './Styles';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import CheckBox from '../../components/CheckBox/';
import RadioButton from '../../components/RadioButton/';
import Separator from '../../components/Separator/';
import createProfile from '../../images/buttons/create_profile_btn.png';

const ArtistForm = ({
  roles,
  types,
  getType,
  handleChange,
  handleRoleChange,
  handleChooseType,
  name,
  onSubmit,
  genre,
  errorMessage,
}) => {

  const roleKeys = Object.keys(roles);
  console.log('artistform', roles);
  return (
    <View style={styles.container}>
      <AppTextInput
        textStyle={styles.input}
        placeholder='Artist Name'
        onChangeText={name => handleChange({name})}
        value={name}
      />
      <AppTextInput
        textStyle={styles.input}
        placeholder='Music Genre'
        onChangeText={genre => handleChange({genre})}
        value={genre}
      />
      <Separator label='ROLES' />
      <AppText textStyle={[styles.h2, styles.sectionHeader]}>
        ARTIST TYPE
      </AppText>
      <View style={styles.section}>
        { Object.keys(types).map((f, i) => {
          console.log('test', getType());
          return <RadioButton key={i}
            checked={f === getType()}
            toggle={() => handleChooseType(f)}
            label={f.toUpperCase()}
          />
        })}
        </View>
      <AppText textStyle={[styles.h2, styles.sectionHeader]}>
        INSTRUMENTS
      </AppText>
      <View style={styles.section}>
        { roleKeys.map((f, i) => (
          <CheckBox key={i}
            checked={roles[f]}
            toggle={() => handleRoleChange(f)}
            label={f.toUpperCase()}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={ onSubmit }>
        <Image source={createProfile} style={styles.image} />
      </TouchableOpacity>
      <AppText textStyle={styles.error}>{errorMessage}</AppText>
    </View>
  );
};

export default ArtistForm;

