import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  Switch,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { Constants, Camera, Location, FileSystem, Permissions } from "expo";
import { Button as RNButton, Icon } from "react-native-elements";

import {
  onAir,
  offAir,
  loginArtist,
  logout
} from "../../redux/actions/ActionCreator";
import { updateDoc } from "../../services/api";
// import { Provider, Subscribe, Container } from 'unstated';

import listItemAvatar from "../../images/test_avatar.png";

import { styles } from "./styles";

import DefaultContainer from "../DefaultContainer";
import AppText from "../../components/AppText";
import RoundImage from "../../components/RoundImage";
import { updateHeader } from "../../utils/UpdateHeader";
import { scale, verticalScale, moderateScale } from "../../utils/Scales";

import onAirButton from "../../images/buttons/onair_btn.png";
import offAirButton from "../../images/buttons/offair_btn.png";
import editIcon from "../../images/icons/edit_btn.png";
import manageSetlistButton from "../../images/buttons/manage_btn.png";
import logoutButton from "../../images/buttons/logout_btn.png";

class ArtistAdmin extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerStyle = Object.assign(
      {},
      params.bg ? { backgroundColor: params.bg } : null
    );
    return {
      title: `${params.title || params.screen || "Artist Admin"}`,
      headerTitleStyle: { textAlign: "center", alignSelf: "center" },
      headerStyle
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      onAir: false,
      showModal: true,
      edit_email: "",
      edit_password: "",
      location: null,
      imageURL: "",
      location: ""
    };
    this.locationRef = null;
    this._isMounted = false;
  }

  setState = params => {
    if (!this._isMounted) {
      console.log("setState memory leak: ", params);
      return;
    }
    super.setState(params);
  };

  editAdmin = () =>
    this.props.navigation.navigate("ArtistSignup", { name: "ArtistSignup" });

  async componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  async componentDidMount() {
    updateHeader(this.props);
    this._isMounted = true;
    // const r = await fetch("https://randomuser.me/api/?inc=picture");
    // const data = await r.json();
    // this.props.loginArtist({ imageURL: data.results[0].picture.large });
  }

  async componentWillUnmount() {
    this._isMounted = false;
    this.locationRef.remove();
    this.props.logout();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate', prevProps, this.props);
    const { showModal } = this.state;
    const { authorized, navigation } = this.props;
    if (!showModal && !authorized) {
      this.props.navigation.goBack();
    }
  }

  componentWillReceiveProps(nextProps) {
    // Secure against endless cycle
    if (
      nextProps.artist === this.props.artist &&
      nextProps.authorized === this.props.authorized
    ) {
      return;
    }
    updateHeader(nextProps);
  }

  async componentDidUnMount() {
    await updateDoc("artist", {
      _id: this.props.artist._id
    });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    this.locationRef = await Location.watchPositionAsync(
      { distanceInterval: 10 },
      async ({ coords = {} }) => {
        const response = await updateDoc("artist", {
          location: {
            lat: coords.latitude,
            lng: coords.longitude
          },
          _id: this.props.artist._id
        });
        this.setState({
          location: { ...response.data.location, err: response.error }
        });
      }
    );
  };

  navigate = pageName => () => {
    this.props.navigation.navigate(pageName, {
      name: pageName,
      artist: this.props.artist
    });
  };

  logout = () => {
    this.navigate("Options")();
  };

  toggleOnAir = async () => {
    const { artist } = this.props;
    if (!artist) {
      return;
    }
    // If switching to on from (currently off)
    if (!artist.live && !this.state.location) {
    }
    const response = await updateDoc("artist", {
      _id: artist._id,
      live: !artist.live
    });
    if (response.error) {
      console.log("Error: ", response.error);
    }
    const newArtist = { ...artist, ...response.data };
    // this.props.dispatch(loginArtist(response.data));
    if (newArtist.live) {
      this.props.onAir();
    } else {
      this.props.offAir();
    }
    this.setState({ errorMessage: response.error });
  };

  handleError(err, msg) {
    this.setState({
      showModal: true,
      authorized: false,
      errorMessage: msg
    });
  }

  renderOnAirImage() {
    const { artist } = this.props;
    const source = (artist || {}).live ? onAirButton : offAirButton;
    return <Image style={[styles.button, { height: 50 }]} source={source} />;
  }

  renderHeaderChildren() {
    return (
      <Fragment>
        <TouchableOpacity onPress={this.editAdmin}>
          <Image style={styles.icon} source={editIcon} resizeMode={"cover"} />
        </TouchableOpacity>
        <Text style={styles.headingText}>ARTIST</Text>
      </Fragment>
    );
  }

  render() {
    const { user, showModal, errorMessage, location } = this.state;
    const { authorized, artist, navigation } = this.props;
    if (!authorized || !artist) return null;
    return (
      artist && (
        <DefaultContainer
          loading={this.state.loading}
          headerChildren={this.renderHeaderChildren()}
          navigation={this.props.navigation}
        >
          <View style={styles.container}>
            {errorMessage && (
              <AppText textStyle={styles.error}>{errorMessage}</AppText>
            )}
            <View style={styles.top}>
              <RoundImage
                source={{
                  uri: artist.imageURL
                }}
                style={{
                  size: 150,
                  borderColor: "#ffd72b",
                  borderWidth: 4
                }}
              />
              <AppText textStyle={styles.title}>{artist.name}</AppText>
              <View>
                <TouchableOpacity onPress={this.toggleOnAir}>
                  {this.renderOnAirImage()}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.middle}>
              <View style={styles.mainBox}>
                <AppText textStyle={styles.h2}>Genre</AppText>
                <AppText textStyle={styles.h3}>{artist.genre}</AppText>
              </View>
              <View style={styles.mainBox}>
                <AppText textStyle={styles.h2}>Roles</AppText>
                <AppText textStyle={styles.h3}>
                  {artist.roles.join(" | ")}
                </AppText>
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={this.navigate("SetList")}>
                <Image
                  style={[styles.button, { height: 68 }]}
                  source={manageSetlistButton}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.logout}>
                <Image
                  style={[styles.button, { height: 55 }]}
                  source={logoutButton}
                />
              </TouchableOpacity>
            </View>
          </View>
        </DefaultContainer>
      )
    );
  }
}

const mapStateToProps = state => {
  console.log("mapStateToProps state: ", state);
  return {
    authorized: state.login.authorized,
    artist: state.artist,
    showModal: state.login.showModal
  };
};

const mapDispatchToProps = dispatch => ({
  loginArtist: data => {
    dispatch(loginArtist(data));
  },
  logout: () => dispatch(logout()),
  onAir: () => dispatch(onAir()),
  offAir: () => dispatch(offAir())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistAdmin);
