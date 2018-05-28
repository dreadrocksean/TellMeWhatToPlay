import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, AsyncStorage, Image, Switch, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import { Constants, Camera, Location, FileSystem, Permissions } from 'expo';
import { Button as RNButton, Icon } from 'react-native-elements';

import { loginArtist, logout, artistEdit } from '../../redux/actions/ActionCreator';
import { updateArtist } from '../../services/api';
// import { Provider, Subscribe, Container } from 'unstated';

import listItemAvatar from '../../images/test_avatar.png';

import { styles } from './styles';

import DefaultContainer from '../DefaultContainer';
import AppImage from '../../components/AppImage';
import AppText from '../../components/AppText';
import RoundImage from '../../components/RoundImage';
import { updateHeader } from '../../utils/UpdateHeader';
import { scale, verticalScale, moderateScale } from '../../utils/Scales';

import onAirButton from '../../images/buttons/onair_btn.png';
import offAirButton from '../../images/buttons/offair_btn.png';
import editIcon from '../../images/icons/edit_btn.png';
import manageSetlistButton from '../../images/buttons/manage_btn.png';
import logoutButton from '../../images/buttons/logout_btn.png';

class ArtistAdmin extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    // console.log('ArtistAdmin params', params);
    const headerStyle = Object.assign({},
      params.bg ? {backgroundColor: params.bg} : null
    );
    return {
      title: `${params.title || params.screen || 'Artist Admin'}`,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
      headerStyle,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      onAir: false,
      showModal: true,
      edit_email: '',
      edit_password: '',
      location: null,
      avatarHeight: 0,
    };
    this.editAdmin = this.editAdmin.bind(this);
    this.onLayout = this.onLayout.bind(this);
    // console.log('manageSetlistButton', manageSetlistButton);
  }

  onLayout(e) {
    const { height } = e.nativeEvent.layout;
    this.setState({avatarHeight: height});
  }

  editAdmin() {
    this.props.dispatch(artistEdit(true));
    this.props.navigation.navigate('ArtistSignup', {name: 'ArtistSignup'});
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
      nextProps.artist === this.props.artist
      && nextProps.authorized === this.props.authorized
    ) {return;}
    updateHeader(nextProps);
  }

  async componentDidUnMount() {
    const response = await updateArtist({
      _id: artist._id,
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
    } catch(err) {
      throw Error('Must have a location', err);
    }
  }

  async _getLocationPermission() {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        throw 'Permission to access location was denied';
      }
      return true;
    } catch(err) {
        this.setState({ errorMessage: err });
        throw Error(err);
    }
  }

  navigate(pageName) {
    this.props.navigation.navigate(pageName, {
      name: pageName, artist: this.props.artist
    });
  }

  logout() {
    this.props.dispatch(logout());
    this.navigate('Options');
  }

  async toggleOnAir() {
    const { artist } = this.props;
    if (!artist) { return; }
    // If switching to on from (currently off)
    if (!artist.live && !this.state.location) {

    }
    try {
      const response = await updateArtist({
        _id: artist._id,
        live: !artist.live
      });
      // console.log('toggleOnAir response', response);
      // this.setState({ artist: response.artist });
      this.props.dispatch(loginArtist(response.artist));
    } catch(err) {
      this.setState({errorMessage: err});
    }
  }

  handleError(err, msg) {
    this.setState({
      showModal: true,
      authorized: false,
      errorMessage: msg,
    });
  }

  renderOnAirImage() {
    const { artist } = this.props;
    const source = (artist || {}).live ? onAirButton : offAirButton;
    return <AppImage source={source} />
  }

  renderHeaderChildren() {
    return (
      <Fragment>
        <TouchableOpacity onPress={this.editAdmin}>
          <Image style={styles.icon}
            source={editIcon}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
        <Text style={styles.headingText}>ARTIST</Text>
      </Fragment>
    );
  }

  render() {
    const { user, onAir, showModal, errorMessage, avatarHeight } = this.state;
    const { authorized, artist, navigation } = this.props;
    return artist && (
      <DefaultContainer
        headerChildren={this.renderHeaderChildren()}
      >
        <View style={styles.container}>
          {errorMessage && <AppText textStyle={styles.error}>{errorMessage}</AppText>}
          <View style={styles.top}>
            <View onLayout={this.onLayout}
              style={{
                flex: 6,
              }}
            >
              <RoundImage
                source={{uri: artist.imageURL}}
                style={{
                  size: avatarHeight,
                  borderColor: '#ffd72b',
                  borderWidth: 4,
                }}
              />
            </View>
            <AppText style={{flex: 2}} textStyle={styles.title}>{artist.name}</AppText>
            <View style={{flex: 3}}>
              <TouchableOpacity style={styles.buttonWrapper}
                onPress={this.toggleOnAir.bind(this)}
              >
                { this.renderOnAirImage() }
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
              <AppText textStyle={styles.h3}>{artist.roles.join(' | ')}</AppText>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.bottomInner}>
              <TouchableOpacity style={styles.buttonWrapper}
                onPress={this.navigate.bind(this, 'SetList')}
              >
                <AppImage source={manageSetlistButton} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonWrapper}
                onPress={this.logout.bind(this)}
              >
                <AppImage source={logoutButton} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DefaultContainer>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  artist: state.login.artist,
  showModal: state.login.showModal,
});

const mapDispatchToProps = dispatch => ({
  artistEdit:  payload => dispatch(artistEdit(payload))
});

export default connect(mapStateToProps)(ArtistAdmin);
