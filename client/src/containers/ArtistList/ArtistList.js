import React, { useState, useRef, useEffect, Fragment } from "react";
import { connect } from "react-redux";
// import { StackNavigator } from "react-navigation";
import firebase from "src/utils/Firestore";
import { getDistance } from "src/utils/General";
import {
  Platform,
  Image,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Animated,
  PanResponder
} from "react-native";
import { Constants } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import styles from "./styles";

import { loadingStatus } from "src/store/actions/ActionCreator";
import DefaultContainer from "src/containers/DefaultContainer";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import ArtistItem from "src/components/ArtistItem";
import { updateHeader } from "src/utils/UpdateHeader";

import sortIcon from "src/images/icons/sort_btn.png";
import findIcon from "src/images/icons/find_btn.png";

const db = firebase.firestore();

const ArtistList = ({ navigation, loadingStatus }) => {
  const [name, setName] = useState(null);
  const [edit_name, setEdit_name] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(null);
  const [add, setAdd] = useState(false);
  const [allArtists, setAllArtists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [nameComplete, setNameComplete] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const locationRef = useRef({ remove: () => {} });
  const unsubscribe = useRef(() => {});
  const _isMounted = useRef(false);

  useEffect(() => {
    _isMounted.current = true;
    if (Platform.OS === "android" && !Constants.isDevice) {
      // console.log("WTF");
      setErrorMessage(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      _getLocationAsync();
    }
    updateArtistList();
    return () => {
      _isMounted.current = false;
      unsubscribe.current();
      locationRef.current.remove();
    };
  }, []);

  const _getLocationAsync = async () => {
    loadingStatus(true);
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
        throw new Error("Permission to access location was denied");
      }

      locationRef.current = await Location.watchPositionAsync(
        { distanceInterval: 10 },
        ({ coords = {} }) => {
          // loadingStatus(false);
          console.log("Latitude: ", coords.latitude);
          setLocation({ lat: coords.latitude, lng: coords.longitude });
        }
      );
    } catch (err) {
      console.log("_getLocationAsync ERR", err);
    }
  };

  const getSortedArtists = () => {
    if (!location) return [];
    console.log("getSortedArtists ARTISTS", artists);
    return artists
      .map(v => {
        v.distance = getDistance(location, v.location);
        return v;
      })
      .sort((a, b) => {
        if (a.distance > b.distance) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      });
  };

  const updateArtistList = async () => {
    loadingStatus(true);
    unsubscribe.current = db.collection("artists").onSnapshot(querySnapshot => {
      loadingStatus(false);
      const artists = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        _id: doc.id
      }));
      setAllArtists(artists);
      setArtists(artists);
      setLoading(false);
      setUpdate(false);
      setAdd(false);
      setName("");
      setShowSearch(false);
    });
  };

  const toggleSearch = () => setShowSearch(!showSearch);

  const search = text => {
    const filtered =
      allArtists.filter(
        v => v.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      ) || !text;
    setArtists(filtered.length ? filtered : allArtists);
  };

  const showSetList = artist => () => {
    // console.log('showSetList artist', artist);
    const { navigate } = navigation;
    navigate("SetList", { name: "SetList", artist });
  };

  const renderHeaderChildren = () => (
    <Fragment>
      <View style={styles.icons}>
        <TouchableOpacity>
          <Image style={styles.icon} source={sortIcon} resizeMode={"cover"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSearch}>
          <Image style={styles.icon} source={findIcon} resizeMode={"cover"} />
        </TouchableOpacity>
      </View>
      <AppText textStyle={[styles.text]}>ARTIST LIST</AppText>
    </Fragment>
  );

  return (
    <DefaultContainer
      navigation={navigation}
      headerChildren={renderHeaderChildren()}
    >
      {showSearch && (
        <AppTextInput
          placeholder="Start typing"
          onChangeText={search}
          value=""
        />
      )}
      <ScrollView style={styles.scroll} pagingEnabled={true}>
        {(getSortedArtists() || artists).map((artist, i) => (
          <ArtistItem
            key={i}
            artist={artist}
            showSetList={showSetList(artist)}
          />
        ))}
      </ScrollView>
    </DefaultContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  loadingStatus: status => dispatch(loadingStatus(status))
});

export default connect(
  null,
  mapDispatchToProps
)(ArtistList);
