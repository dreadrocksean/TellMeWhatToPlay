import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { NavigationActions } from "react-navigation";

import styles from "./styles";

const DrawerContainer = ({ navigation, activeItemKey }) => (
  <View style={styles.container}>
    <Text
      onPress={() => navigation.navigate("screen1")}
      style={
        activeItemKey === "screen1" ? styles.selDrawerItem : styles.drawerItem
      }
    >
      Screen 1
    </Text>
    <Text
      onPress={() => navigation.navigate("screen2")}
      style={
        activeItemKey === "screen2" ? styles.selDrawerItem : styles.drawerItem
      }
    >
      Screen 2
    </Text>
    <Text
      onPress={() => navigation.navigate("screen3")}
      style={
        activeItemKey === "screen3" ? styles.selDrawerItem : styles.drawerItem
      }
    >
      Screen 3
    </Text>
    <Text
      onPress={() => {
        const actionToDispatch = NavigationActions.reset({
          index: 0,
          key: null, // black magic
          actions: [NavigationActions.navigate({ routeName: "loginStack" })]
        });
        this.props.navigation.dispatch(actionToDispatch);
      }}
      style={styles.drawerItem}
    >
      Logout
    </Text>
  </View>
);

export default DrawerContainer;
