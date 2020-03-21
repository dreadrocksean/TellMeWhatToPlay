import React from "react";
import { View, TouchableOpacity } from "react-native";

import styles from "./styles";
import AppText from "src/components/AppText";

const ArtistDropdownItem = ({ item, onPressItem, key }) => {
  onPress = () => {
    onPressItem(item);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.listItem} textStyle={styles.listItemText}>
        {item.artist}
      </AppText>
    </TouchableOpacity>
  );
};

export default ArtistDropdownItem;
