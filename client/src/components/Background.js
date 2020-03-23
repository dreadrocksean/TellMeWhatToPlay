import React from "react";
import { StyleSheet, Image } from "react-native";
import bg from "src/images/bg.png";
import { width, height } from "src/utils/General";

const Background = () => <Image source={bg} style={styles.backgroundImage} />;

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    resizeMode: "cover"
  }
});

export default Background;
