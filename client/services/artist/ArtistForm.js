import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, Image, TouchableOpacity, View } from 'react-native';
import { FileSystem, FaceDetector, MediaLibrary } from 'expo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import testPhoto from '../../images/test_avatar.png';

import styles from './Styles';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import CheckBox from '../../components/CheckBox/';
import RadioButton from '../../components/RadioButton/';
import ImageUpload from '../../components/ImageUpload/';
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
  onPressCam,
  photo,
}) => {

  const roleKeys = Object.keys(roles);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <ImageUpload style={styles.imageUpload}
          source={{
            uri: `${FileSystem.documentDirectory}photos/${photo}`,
          }}
          onPress={onPressCam}
        />
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
        <AppText textStyle={styles.h2} style={styles.sectionHeader}>
          ARTIST TYPE
        </AppText>
        <View style={styles.section}>
          { Object.keys(types).map((f, i) => {
            return <RadioButton key={i}
              checked={f === getType()}
              onPress={() => handleChooseType(f)}
              label={f.toUpperCase()}
            />
          })}
        </View>
        <AppText textStyle={styles.h2} style={styles.sectionHeader}>
          INSTRUMENTS
        </AppText>
        <View style={styles.section}>
          { roleKeys.map((f, i) => (
            <CheckBox key={i}
              checked={roles[f]}
              onPress={() => handleRoleChange(f)}
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
    </KeyboardAwareScrollView>
  );
};

export default ArtistForm;

