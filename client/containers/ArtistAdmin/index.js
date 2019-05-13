import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
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
import { updateArtist, updateDoc } from "../../services/api";
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
      location: null
    };
    this.editAdmin = this.editAdmin.bind(this);
  }

  editAdmin() {
    this.props.navigation.navigate("ArtistSignup", { name: "ArtistSignup" });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate', prevProps, this.props);
    const { showModal } = this.state;
    const { authorized, navigation } = this.props;
    if (!showModal && !authorized) {
      this.props.navigation.goBack();
    }
  }

  async componentDidMount() {
    updateHeader(this.props);
    // this._getLocationAsync();
  }

  componentWillReceiveProps(nextProps) {
    // Secure against endless cycle
    if (
      nextProps.artistUser === this.props.artistUser &&
      nextProps.authorized === this.props.authorized
    ) {
      return;
    }
    updateHeader(nextProps);
  }

  async componentDidUnMount() {
    const response = await updateArtist({
      _id: this.props.artistUser._id,
      live: false
    });
  }

  async _getLocationAsync() {
    try {
      const permission = await this._getLocationPermission;
      const geoLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = geoLocation.coords;
      const location = { latitude, longitude };
      this.setState({ location });
    } catch (err) {
      throw Error("Must have a location", err);
    }
  }

  async _getLocationPermission() {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        throw "Permission to access location was denied";
      }
      return true;
    } catch (err) {
      this.setState({ errorMessage: err });
      throw Error(err);
    }
  }

  navigate = pageName => () => {
    this.props.navigation.navigate(pageName, {
      name: pageName,
      artist: this.props.artistUser
    });
  };

  logout = () => {
    this.props.logout();
    this.navigate("Options")();
  };

  toggleOnAir = async () => {
    const { artistUser, admin } = this.props;
    if (!artistUser) {
      return;
    }
    // If switching to on from (currently off)
    if (!admin.live && !this.state.location) {
    }
    const response = await updateDoc("artist", {
      _id: artistUser._id,
      live: !admin.live
    });
    if (response.error) {
      console.log("Error: ", response.error);
    }
    const newArtist = { ...artistUser, ...admin, ...response.data };
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
    const { admin } = this.props;
    const source = (admin || {}).live ? onAirButton : offAirButton;
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
    const { user, showModal, errorMessage } = this.state;
    const { authorized, artistUser, admin, navigation } = this.props;
    return (
      artistUser && (
        <DefaultContainer headerChildren={this.renderHeaderChildren()}>
          <View style={styles.container}>
            {errorMessage && (
              <AppText textStyle={styles.error}>{errorMessage}</AppText>
            )}
            <View style={styles.top}>
              <RoundImage
                source={{ uri: artistUser.imageURL }}
                style={{
                  size: 150,
                  borderColor: "#ffd72b",
                  borderWidth: 4
                }}
              />
              <AppText textStyle={styles.title}>{artistUser.name}</AppText>
              <View>
                <TouchableOpacity onPress={this.toggleOnAir}>
                  {this.renderOnAirImage()}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.middle}>
              <View style={styles.mainBox}>
                <AppText textStyle={styles.h2}>Genre</AppText>
                <AppText textStyle={styles.h3}>{artistUser.genre}</AppText>
              </View>
              <View style={styles.mainBox}>
                <AppText textStyle={styles.h2}>Roles</AppText>
                <AppText textStyle={styles.h3}>
                  {artistUser.roles.join(" | ")}
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

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  artistUser: state.login.artist,
  admin: state.artist,
  showModal: state.login.showModal
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  onAir: () => dispatch(onAir()),
  offAir: () => dispatch(offAir())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistAdmin);
