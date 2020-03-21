import React, { useState, useRef, useEffect, Fragment } from "react";
import { connect } from "react-redux";
// import { StackNavigator } from "react-navigation";
import firebase from "src/utils/Firestore";
import { getDistance } from "src/utils/General";
import {
  Platform,
  Dimensions,
  StyleSheet,
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

import { loadingStatus } from "src/store/actions/ActionCreator";

import DefaultContainer from "./DefaultContainer";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import ArtistItem from "src/components/ArtistItem";
import { updateHeader } from "src/utils/UpdateHeader";

import sortIcon from "src/images/icons/sort_btn.png";
import findIcon from "src/images/icons/find_btn.png";
import { fetchArtists } from "src/services/api";

const db = firebase.firestore();
const { width, height } = Dimensions.get("window");

const ArtistList = ({ navigation, authorized, loadingStatus }) => {
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
  const unsubscribe = useRef(null);
  const _isMounted = useRef(false);

  useEffect(() => {
    // updateHeader({ navigation, authorized });
  }, []);

  useEffect(() => {
    _isMounted.current = true;
    if (Platform.OS === "android" && !Constants.isDevice) {
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

  // setState = params => {
  //   if (!this._isMounted) {
  //     console.log("setState memory leak: ", params);
  //     return;
  //   }
  //   super.setState(params);
  // };

  const _getLocationAsync = async () => {
    loadingStatus(true);
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
    }

    locationRef.current = await Location.watchPositionAsync(
      { distanceInterval: 10 },
      ({ coords = {} }) => {
        loadingStatus(false);
        console.log("Latitude: ", coords.latitude);
        setLocation({ lat: coords.latitude, lng: coords.longitude });
      }
    );
  };

  const getSortedArtists = () => {
    if (!location) return [];
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

  const home = () => navigation.navigate("Options");

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
      loading={loading}
      headerChildren={renderHeaderChildren()}
      navigation={navigation}
    >
      {showSearch && (
        <AppTextInput
          placeholder="Start typing"
          onChangeText={search}
          value=""
        />
      )}
      <ScrollView style={styles.scroll} pagingEnabled={true}>
        {getSortedArtists().map((artist, i) => {
          return (
            <ArtistItem
              key={i}
              artist={artist}
              showSetList={showSetList(artist)}
            />
          );
        })}
      </ScrollView>
    </DefaultContainer>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 60
  },
  icon: {
    width: 30,
    height: 30
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 65
  },
  text: {
    // textAlign: 'right',
    color: "white",
    fontSize: 17,
    fontFamily: "montserrat-regular"
  }
});

ArtistList.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  const headerStyle = Object.assign(
    {},
    params.bg ? { backgroundColor: params.bg } : null
  );
  return {
    title: `${params.title || params.screen || "Artist List"}`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle
  };
};

ArtistList.defaultProps = { fetchArtists };

const mapStateToProps = state => ({
  authorized: state.login.authorized
});

const mapDispatchToProps = dispatch => ({
  loadingStatus: status => dispatch(loadingStatus(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistList);
