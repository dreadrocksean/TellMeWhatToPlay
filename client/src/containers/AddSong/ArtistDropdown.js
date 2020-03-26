import React from "react";
import { View, FlatList } from "react-native";

import styles from "./styles";
import ArtistDropdownItem from "./ArtistDropdownItem";
import AppText from "src/components/AppText";

const ArtistDropdown = ({ data = [], onPress, action }) => {
  if (!data.length) {
    return null;
  }

  const onPressItem = item => {
    onPress(item);
  };

  const renderArtistItem = ({ item }) => {
    return <ArtistDropdownItem item={item} onPressItem={onPressItem} />;
  };

  return (
    <View style={styles.dropdown}>
      <AppText textStyle={styles.listHeadingText}>SUGGESTED ARTISTS</AppText>
      <FlatList
        data={data}
        renderItem={renderArtistItem}
        keyExtractor={(item, index) => item.key.toString()}
      />
      {action}
    </View>
  );
};

export default ArtistDropdown;
