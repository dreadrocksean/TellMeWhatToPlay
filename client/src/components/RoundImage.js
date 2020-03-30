import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";

const RoundImage = props => {
  const size = {
    width: props.size,
    height: props.size,
    borderRadius: props.size / 2
  };
  return (
    <View style={[styles.avatarContainer, size, props.style]}>
      <Image
        style={styles.avatarImage}
        source={props.source}
        resizeMode={"cover"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    overflow: "hidden",
    borderColor: "#ff3a80",
    borderWidth: 2
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  }
});

export default RoundImage;
