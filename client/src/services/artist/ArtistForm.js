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
import createProfile from "src/images/buttons/create_profile_btn.png";

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
        <ImageUpload
          style={styles.imageUpload}
          source={{ uri: photo }}
          onPress={onPressCam}
        />
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
        <Separator label="ROLES" />
        <AppText textStyle={styles.h2} style={styles.sectionHeader}>
          ARTIST TYPE
        </AppText>
        <View style={styles.section}>
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
        <View style={styles.section}>
          {roleKeys.map((f, i) => (
            <CheckBox
              key={i}
              checked={roles[f]}
              onPress={() => handleRoleChange(f)}
              label={f.toUpperCase()}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Image source={createProfile} style={styles.image} />
        </TouchableOpacity>
        {!!errorMessage && (
          <AppText textStyle={styles.error}>{errorMessage}</AppText>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ArtistForm;
