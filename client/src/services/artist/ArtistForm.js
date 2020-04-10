import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { FileSystem, FaceDetector, MediaLibrary } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./styles";

import testPhoto from "src/images/test_avatar.png";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import CheckBox from "src/components/CheckBox/";
import RadioButton from "src/components/RadioButton/";
import ImageUpload from "src/components/ImageUpload/";
import Separator from "src/components/Separator/";
import createArtist from "src/images/buttons/create_artist_btn.png";
import updateArtist from "src/images/buttons/update_artist_btn.png";

const ArtistForm = ({
  roles,
  types,
  getType,
  handleChange,
  handleRoleChange,
  handleChooseType,
  id,
  name,
  onSubmit,
  genre,
  errorMessage,
  onPressCam,
  photo
}) => {
  const roleKeys = Object.keys(roles);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.formRoot}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <ImageUpload
            style={styles.imageUpload}
            source={{ uri: photo }}
            onPress={onPressCam}
          />
        </View>
        <AppTextInput
          textStyle={styles.inputText}
          style={styles.input}
          placeholder="Artist Name"
          onChangeText={handleChange("name")}
          value={name}
        />
        <AppTextInput
          textStyle={styles.inputText}
          style={styles.input}
          placeholder="Music Genre"
          onChangeText={handleChange("genre")}
          value={genre}
        />
        <Separator style={styles.separator} label="ROLES" />
        <AppText textStyle={styles.h2} style={styles.sectionHeader}>
          ARTIST TYPE
        </AppText>
        <View style={[styles.section, styles.radioSection]}>
          {Object.keys(types).map((f, i) => (
            <RadioButton
              key={i}
              checked={f === getType()}
              onPress={() => handleChooseType(f)}
              label={f.toUpperCase()}
            />
          ))}
        </View>
        <AppText textStyle={styles.h2} style={styles.sectionHeader}>
          INSTRUMENTS
        </AppText>
        <View style={[styles.section, styles.checkBoxSection]}>
          {roleKeys.map((f, i) => (
            <CheckBox
              key={i}
              checked={roles[f]}
              onPress={() => handleRoleChange(f)}
              label={f.toUpperCase()}
              ellipsis
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          {id ? (
            <Image
              source={updateArtist}
              resizeMode="contain"
              style={styles.image}
            />
          ) : (
            <Image
              source={createArtist}
              resizeMode="contain"
              style={styles.image}
            />
          )}
        </TouchableOpacity>
        {!!errorMessage && (
          <AppText textStyle={styles.error}>{errorMessage}</AppText>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ArtistForm;
