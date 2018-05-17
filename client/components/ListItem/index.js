import React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';

import listItemStyle from './styles';

const { width, height } = Dimensions.get('window');

const ListItem = props => {
  const itemStyle = props.disabled ? 'itemDisabled' : 'itemActive';

  return (
    <View style={styles.itemContainer}>
      <View style={[styles.item, styles[itemStyle]]}>
        <TouchableOpacity
          style={styles.button}
          onPress={props.onClick}
          disabled={props.disabled}
        >
          <View style={styles.content}>{props.children}</View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...listItemStyle,
});

export default ListItem;