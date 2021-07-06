import React from "react";
import { Dimensions, StyleSheet, View, TouchableOpacity } from "react-native";

import styles from "./styles";

const { width, height } = Dimensions.get("window");

const ListItem = ({ disabled, onClick, children }) => {
  const itemStyle = disabled ? "itemDisabled" : "itemActive";

  return (
    <View style={styles.itemContainer}>
      <View style={{ ...styles.item, ...styles[itemStyle] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={onClick}
          disabled={disabled}
        >
          <View style={styles.content}>{children}</View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItem;
