import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import DefaultContainer from "./DefaultContainer";
import { updateHeader } from "src/utils/UpdateHeader";
import { fetchLyrics } from "src/services/api";

const Lyrics = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    const getLyrics = async () => {
      try {
        const { title, artist } = route.params;
        const data = await fetchLyrics(title, artist);
        setLoading(false);
        setLyrics(data.result.track.text);
      } catch (err) {
        setLoading(false);
        setLyrics("Sorry. No lyrics available :-(");
      }
    };
    // updateHeader({ navigation });
    setLoading(true);
    getLyrics();
  }, []);

  return (
    <DefaultContainer
      loading={false}
      goHome={() => navigation.navigate("Options")}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>{lyrics}</Text>
        </View>
      </ScrollView>
    </DefaultContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    fontSize: 20,
    color: "#d4d4d4"
  }
});

export default Lyrics;
