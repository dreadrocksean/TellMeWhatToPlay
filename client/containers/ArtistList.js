import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { StackNavigator } from "react-navigation";
import firebase from "../utils/Firestore.js";
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
import { Constants, Location, Permissions } from "expo";
import * as Animatable from "react-native-animatable";

import DefaultContainer from "./DefaultContainer";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ArtistItem from "../components/ArtistItem";
import { updateHeader } from "../utils/UpdateHeader";

import sortIcon from "../images/icons/sort_btn.png";
import findIcon from "../images/icons/find_btn.png";
import { fetchArtists } from "../services/api";

const db = firebase.firestore();
const { width, height } = Dimensions.get("window");

class ArtistList extends Component {
  static navigationOptions = ({ navigation }) => {
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

  static defaultProps = { fetchArtists };

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      edit_name: null,
      loading: false,
      update: null,
      add: false,
      allArtists: [],
      artists: [],
      nameComplete: "",
      location: null
    };
    updateHeader(this.props);
    this.locationRef = null;
  }

  componentWillMount() {
    // this.updateArtistList();
  }

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
    this.updateArtistList();
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.locationRef.remove();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    this.locationRef = await Location.watchPositionAsync(
      { distanceInterval: 0.001, enableHighAccuracy: true },
      ({ coords = {} }) => {
        console.log("Latitude: ", coords.latitude);
        this.setState({
          location: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });
      }
    );
  };

  getDistance = (
    { lat: lat1, lng: lng1 },
    { lat: lat2, lng: lng2 },
    unit = "M"
  ) => {
    if (lat1 == lat2 && lng1 == lng2) return 0;
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lng1 - lng2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) dist = 1;
    dist = Math.acos(dist);
    dist *= 180 / Math.PI;
    dist *= 60 * 1.1515;
    if (unit == "K") {
      dist *= 1.609344;
    } // Kilometres
    if (unit == "N") {
      dist *= 0.8684;
    } // Nautical
    return dist;
  };

  getSortedArtists = () => {
    const { location } = this.state;
    if (!location) return [];
    return this.state.allArtists.sort((a, b) => {
      const aDist = this.getDistance(location, a.location);
      const bDist = this.getDistance(location, b.location);
      if (aDist > bDist) {
        return 1;
      }
      if (aDist < bDist) {
        return -1;
      }
      return 0;
    });
  };

  updateArtistList = async () => {
    // this.setState({ loading: true });
    this.unsubscribe = db.collection("artists").onSnapshot(querySnapshot => {
      const artists = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        _id: doc.id
      }));
      this.setState({
        allArtists: artists,
        artists,
        loading: false,
        update: false,
        add: false,
        name: "",
        showSearch: false
      });
    });
  };

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  search = text => {
    const filtered =
      this.state.allArtists.filter(
        v => v.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      ) || !text;

    this.setState({
      artists: filtered.length ? filtered : this.state.allArtists
    });
  };

  showSetList = artist => () => {
    // console.log('showSetList artist', artist);
    const { navigate } = this.props.navigation;
    navigate("SetList", { name: "SetList", artist });
  };

  home = () => this.props.navigation.navigate("Options");

  renderHeaderChildren() {
    return (
      <Fragment>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Image style={styles.icon} source={sortIcon} resizeMode={"cover"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleSearch}>
            <Image style={styles.icon} source={findIcon} resizeMode={"cover"} />
          </TouchableOpacity>
        </View>
        <AppText textStyle={[styles.text]}>ARTIST LIST</AppText>
      </Fragment>
    );
  }

  render() {
    const { showSearch } = this.state;
    return (
      <DefaultContainer
        loading={this.state.loading}
        headerChildren={this.renderHeaderChildren()}
        navigation={this.props.navigation}
      >
        {showSearch && (
          <AppTextInput
            placeholder="Start typing"
            onChangeText={this.search}
            value=""
          />
        )}
        <ScrollView style={styles.scroll} pagingEnabled={true}>
          {this.getSortedArtists(this.state.artists).map((artist, i) => {
            return (
              <ArtistItem
                key={i}
                artist={artist}
                showSetList={this.showSetList(artist)}
              />
            );
          })}
        </ScrollView>
      </DefaultContainer>
    );
  }
}

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

const mapStateToProps = state => ({
  authorized: state.login.authorized
});
export default connect(mapStateToProps)(ArtistList);
