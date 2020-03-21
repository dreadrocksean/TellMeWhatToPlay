import React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";

import styles from "./styles";

export default ({ captures = [], onPress }) => (
  <ScrollView
    horizontal={true}
    style={[styles.bottomToolbar, styles.galleryContainer]}
  >
    {captures.map(({ uri, base64 }) => (
      <TouchableOpacity
        onPress={onPress(base64)}
        style={styles.galleryImageContainer}
        key={uri}
      >
        <Image source={{ uri }} style={styles.galleryImage} />
      </TouchableOpacity>
    ))}
  </ScrollView>
);
