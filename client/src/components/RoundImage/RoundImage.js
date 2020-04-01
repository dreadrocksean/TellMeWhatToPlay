import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";

const RoundImage = ({ style, size: dimensions, source }) => {
  const size = {
    width: dimensions,
    height: dimensions,
    borderRadius: dimensions / 2
  };
  return (
    <View style={[styles.avatarContainer, size, style]}>
      <Image style={styles.avatarImage} source={source} resizeMode={"cover"} />
    </View>
  );
};

export default RoundImage;
