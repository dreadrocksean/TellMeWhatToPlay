import React from 'react';
import { View, FlatList } from 'react-native';

import styles from './styles';
import ArtistDropdownItem from './ArtistDropdownItem';
import AppText from '../../components/AppText';

const ArtistDropdown = ({ data, onPress }) => {

  if (!data.length) {return null;}

  const onPressItem = item => {
    onPress(item);
  };

  const renderArtistItem = ({item}) => {
    return <ArtistDropdownItem
      item={item}
      onPressItem={onPressItem}
    />
  };

  return (
    <View style={styles.dropdown}>
      <AppText style={styles.listHeading} textStyle={styles.listHeadingText}
      >SUGGESTED ARTISTS</AppText>
      <FlatList
        data={data}
        renderItem={renderArtistItem}
      />
    </View>
  );

};

export default ArtistDropdown;