import React from "react";
import { View, FlatList } from "react-native";

import styles from "./styles";
import ArtistDropdownItem from "./ArtistDropdownItem";
import AppText from "src/components/AppText";

const ArtistDropdown = ({ style, data = [], onPress, action }) => {
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
    <View style={style}>
      <View style={styles.listHeading}>
        <AppText textStyle={styles.listHeadingText}>SUGGESTED ARTISTS</AppText>
      </View>
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
