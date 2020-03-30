import React from "react";
import { connect } from "react-redux";

import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Animated,
  PanResponder
} from "react-native";
import { Button as RNButton, Icon } from "react-native-elements";

import Background from "src/components/Background";
import ListHeader from "src/components/ListHeader";
import bg from "src/images/bg.png";

const DefaultContainer = ({
  loading,
  navigation,
  headerChildren,
  style,
  children
}) => {
  const home = navigation ? () => navigation.popToTop() : () => {};
  return loading ? (
    <View style={styles.loading}>
      <Background />
      <ActivityIndicator size="large" color="#ffff00" />
    </View>
  ) : (
    <View style={styles.container}>
      <Background />
      <ListHeader home={home}>{headerChildren}</ListHeader>
      <View style={styles.children}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7
  },
  children: {
    flex: 1
    // backgroundColor: "purple"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddccff"
  },
  body: {
    marginTop: 0
  }
});

const mapStateToProps = state => ({
  loading: state.app.loading
});

export default connect(mapStateToProps)(DefaultContainer);
