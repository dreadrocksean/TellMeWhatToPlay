import React, { useState } from "react";
import { TextInput, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const SongForm = ({
  handleChange,
  titleComplete,
  title,
  artistComplete,
  author,
  onSubmit,
  command
}) => {
  const [localTitle, setLocalTitle] = useState("");
  const [localAuthor, setLocalAuthor] = useState("");

  const _handleChange = fieldFunc => val => {
    console.log(val);
    fieldFunc(val);
    handleChange(field);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 4 }}>
        <TextInput
          style={styles.autocomplete}
          placeholder={titleComplete || ""}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={_handleChange(setLocalTitle)}
          value={title || localTitle}
        />
      </View>
      <View style={{ flex: 4 }}>
        <TextInput
          style={styles.autocomplete}
          placeholder={artistComplete || ""}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder={artistComplete ? "" : "Artist"}
          onChangeText={_handleChange(setLocalAuthor)}
          value={author || localAuthor}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>{command}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SongForm;
