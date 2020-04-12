import React from "react";
import { Image, View } from "react-native";

import styles from "./styles";
import AppText from "src/components/AppText";

const Score = ({ icon, votes, disabled, short = false }) => {
  const disabledStyles = disabled ? { backgroundColor: "#999" } : null;
  const shortScoreStyle = short
    ? {
        justifyContent: "center",
        paddingHorizontal: 0,
        width: styles.score.height * 1.4
      }
    : null;
  const shortTextStyle = short
    ? {
        textAlign: "center"
      }
    : null;

  return (
    <View style={{ ...styles.score, ...shortScoreStyle, ...disabledStyles }}>
      {icon && (
        <View style={styles.scoreIcon}>
          <Image source={icon} style={styles.gImage} />
        </View>
      )}
      <AppText
        textStyle={{ ...styles.text, ...shortTextStyle, ...styles.scoreText }}
      >
        {votes}
      </AppText>
    </View>
  );
};

export default Score;
