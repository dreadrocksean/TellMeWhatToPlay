import React from "react";
import { connect } from "react-redux";
import {
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

import styles from "./styles";

import Modal from "src/components/Modal";
import Loading from "src/components/Loading";
import Background from "src/components/Background";
import ListHeader from "src/components/ListHeader";
import bg from "src/images/bg.png";

const pickTrue = (variable, val) =>
  typeof variable === "undefined" ? val : variable;

const DefaultContainer = ({
  loading,
  navigation,
  children,
  style,
  headerLeft,
  headerMiddle,
  headerRight,
  headerHeight,
  bodyPaddingTop
}) => {
  const home = navigation ? () => navigation.popToTop() : () => {};
  const headerStyles = { height: pickTrue(headerHeight, 50) };
  const bodyStyles = {
    paddingTop: pickTrue(bodyPaddingTop, headerStyles.height + 10)
  };

  return loading ? (
    <View style={styles.loading}>
      <Background />
      <ActivityIndicator size="large" color="#ffff00" />
      {/*<Loading size="large" color="#ffff00" />*/}
    </View>
  ) : (
    <View style={{ ...styles.root, ...style }}>
      <Background />
      <ListHeader
        style={{ ...styles.listHeader, ...headerStyles }}
        home={home}
        headerLeft={headerLeft}
        headerMiddle={headerMiddle}
        headerRight={headerRight}
      />
      <View style={{ ...styles.children, ...bodyStyles }}>{children}</View>
      <Modal style={styles.modal} />
    </View>
  );
};

const mapStateToProps = state => ({
  loading: state.app.loading
});

export default connect(mapStateToProps)(DefaultContainer);
