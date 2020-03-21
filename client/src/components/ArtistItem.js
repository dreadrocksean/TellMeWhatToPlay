import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { Button as RNButton, Icon } from "react-native-elements";

import cloudinaryConfig from "src/utils/Cloudinary";
import ListItem from "src/components/ListItem/";
import AppText from "src/components/AppText";
import listItemStyle from "src/components/ListItem/styles";
import listItemBg from "src/images/buttons/list_btn.png";
import listItemAvatar from "src/images/test_avatar.png";
import geoMarkerIcon from "src/images/icons/marker.png";

const { width, height } = Dimensions.get("window");

const ArtistItem = props => {
  const {
    name = "Lindsey Stroud",
    genre = "Alternative Hiphop",
    instruments = ["Singer Songwriter"],
    live,
    distance,
    imageURL
  } = props.artist;

  const feet = Math.round(distance * 5280);
  const miles = Math.round(distance);
  const distanceStr = miles > 0 ? `${miles} Mi` : `${feet} Ft`;

  return (
    <ListItem disabled={!live} onClick={props.showSetList}>
      <View style={styles.leftInfo}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.image}
            source={{ uri: imageURL || cloudinaryConfig.userUrl }}
            resizeMode={"cover"}
          />
        </View>
        <View style={styles.info}>
          <AppText
            textStyle={[styles.text, { color: "#3c2385", fontSize: 16 }]}
          >
            {name}
          </AppText>
          <AppText
            textStyle={[styles.text, { color: "#ff3a80", fontSize: 11 }]}
          >
            {genre}
          </AppText>
          <AppText
            textStyle={[styles.text, { color: "#9c9c9c", fontSize: 11 }]}
          >
            {instruments.join(" | ")}
          </AppText>
        </View>
      </View>
      <View style={styles.rightInfo}>
        <View style={styles.markerContainer}>
          <Image
            style={styles.image}
            source={geoMarkerIcon}
            resizeMode={"contain"}
          />
        </View>
        {<AppText textStyle={styles.distance}>{distanceStr}</AppText>}
      </View>
    </ListItem>
  );
};
const styles = StyleSheet.create({
  ...listItemStyle,
  avatarContainer: {
    width: 55,
    height: 55,
    borderRadius: 55,
    borderColor: "#ff3a80",
    borderWidth: 2,
    overflow: "hidden"
  },
  markerContainer: {
    width: 10,
    marginRight: 2
  },
  icon: {
    marginLeft: 15
  },
  distance: {
    color: "#35a3de",
    fontWeight: "bold",
    fontSize: 11
  },
  text: {
    textAlign: "left",
    fontFamily: "montserrat-regular",
    fontWeight: "normal"
  }
});

export default ArtistItem;
