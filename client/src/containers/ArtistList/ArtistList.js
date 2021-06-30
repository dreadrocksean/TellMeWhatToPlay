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

import styles from "./styles";

import { loadingStatus } from "src/store/actions/ActionCreator";
import DefaultContainer from "src/containers/DefaultContainer";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import ArtistItem from "src/components/ArtistItem";

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
      try {
        _getLocationAsync();
      } catch (err) {
        console.log("ArtistList useEffect ERR", err);
      }
    }
    updateArtistList();
    return () => {
      _isMounted.current = false;
      unsubscribe.current();
      locationRef.current && locationRef.current.remove();
    };
  }, []);

  const _getLocationAsync = async () => {
    loadingStatus(true);
    try {
      // const { status } = await Permissions.askAsync(Permissions.LOCATION);
      const {status} = await Location.requestForegroundPermissionsAsync();
      console.log("TCL: _getLocationAsync -> status", status)
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
      }

      locationRef.current = await Location.watchPositionAsync(
        { distanceInterval: 10 },
        ({ coords = {} }) => {
          setLocation({ lat: coords.latitude, lng: coords.longitude });
        }
      );
    } catch (err) {
      console.log("_getLocationAsync ERR", err);
    }
  };

  const getSortedArtists = () => {
    if (!location) return [];
    return artists
      .map(v => {
        v.distance =
          location && v.location ? getDistance(location, v.location) : 0;
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
    unsubscribe.current = db
      .collection("artists")
      .onSnapshot(async querySnapshot => {
        loadingStatus(false);

        const anAsyncFunction = async doc => {
          const locationSnap = await doc.ref
            .collection("geoData")
            .doc("location")
            .get();
          const data = {
            ...doc.data(),
            _id: doc.id,
            location: locationSnap.data()
          };
          return Promise.resolve(data);
        };

        const getData = async () =>
          Promise.all(querySnapshot.docs.map(doc => anAsyncFunction(doc)));

        try {
          const artists = await getData();

          setAllArtists(artists);
          setArtists(artists);
          setLoading(false);
          setUpdate(false);
          setAdd(false);
          setName("");
          setShowSearch(false);
        } catch (err) {
          console.log(err);
          setErrorMessage("Problem getting artists.");
        }
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

  const renderHeaderLeft = () => (
    <View style={styles.icons}>
      <TouchableOpacity>
        <Image style={styles.icon} source={sortIcon} resizeMode={"cover"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleSearch}>
        <Image style={styles.icon} source={findIcon} resizeMode={"cover"} />
      </TouchableOpacity>
    </View>
  );

  const renderHeaderMiddle = () => (
    <AppText textStyle={styles.text}>ARTIST LIST</AppText>
  );

  return (
    <DefaultContainer
      navigation={navigation}
      headerLeft={renderHeaderLeft()}
      headerMiddle={renderHeaderMiddle()}
    >
      {showSearch && (
        <AppTextInput
          style={styles.search}
          placeholder="Start typing"
          onChangeText={search}
          value=""
        />
      )}
      <View style={styles.scroll}>
        <ScrollView pagingEnabled={true}>
          {(getSortedArtists() || artists).map((artist, i) => (
            <ArtistItem
              key={i}
              artist={artist}
              showSetList={showSetList(artist)}
            />
          ))}
        </ScrollView>
      </View>
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
