import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions, StyleSheet, Text, View, AsyncStorage, Image, Switch, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import { Constants, Camera, Location, FileSystem, Permissions } from 'expo';
import { Button as RNButton, Icon } from 'react-native-elements';
import { onAir, offAir, loginArtist, logout } from '../redux/actions/ActionCreator';
import { updateArtist } from '../services/api';
// import { Provider, Subscribe, Container } from 'unstated';

import listItemAvatar from '../images/list/test_avatar.png';

import DefaultContainer from './DefaultContainer';
import RoundImage from '../components/RoundImage';
import { updateHeader } from '../utils/UpdateHeader';
import { scale, verticalScale, moderateScale } from '../utils/Scales';

import onAirIcon from '../images/list/onair_btn.png';
import offAirIcon from '../images/list/offair_btn.png';
import editIcon from '../images/list/edit_btn.png';
import manageSetlistIcon from '../images/list/manage_btn.png';
import logoutIcon from '../images/list/logout_btn.png';

const {height, width} = Dimensions.get('window');

class ArtistAdmin extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerStyle = Object.assign({},
      params.bg ? {backgroundColor: params.bg} : null
    );
    return {
      title: `${params.title || params.screen || 'Artist Admin'}`,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
      headerStyle,
    };
  };

  state = {
    user: null,
    onAir: false,
    showModal: true,
    edit_email: '',
    edit_password: '',
    location: null,
  };

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
    this._getLocationAsync();

    // Image.getSize(myUri, (width, height) => {this.setState({width, height})});
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
    const source = (artist || {}).live ? onAirIcon : offAirIcon;
    return <Image style={[styles.button, { height: 50 }]} source={source} />
  }

  renderHeaderChildren() {
    return (
      <View style={styles.iconsContainer}>
        <Image style={styles.icon}
          source={editIcon}
          resizeMode={'cover'}
        />
        <View style={{transform: [{translate: [35, 0]}]}}>
        <Text style={styles.headingText}>ARTIST</Text>
        </View>
      </View>
    );
  }

  render() {
    const { user, onAir, showModal, errorMessage } = this.state;
    const { authorized, artist, navigation } = this.props;
    console.log('test', artist.roles.join(' | '));
    return (
      <DefaultContainer
        headerChildren={this.renderHeaderChildren()}
      >
        <View style={styles.container}>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          <View style={styles.top}>
            <RoundImage
              source={listItemAvatar}
              style={{
                size: 150,
                borderColor: '#ffd72b',
                borderWidth: 4,
              }}
            />
            <Text style={styles.title}>{artist.name}</Text>
            <View>
              <TouchableOpacity
                onPress={this.toggleOnAir.bind(this)}
              >
                { this.renderOnAirImage() }
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middle}>
            <View style={styles.mainBox}>
              <Text style={styles.h2}>Genre</Text>
              <Text style={styles.h3}>{artist.genre}</Text>
            </View>
            <View style={styles.mainBox}>
              <Text style={styles.h2}>Roles</Text>
              <Text style={styles.h3}>{artist.roles.join(' | ')}</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={this.navigate.bind(this, 'SetList')}
            >
              <Image
                style={[styles.button, { height: 68 }]}
                source={manageSetlistIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.logout.bind(this)}
            >
              <Image
                style={[styles.button, { height: 55 }]}
                source={logoutIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </DefaultContainer>
    );
  }
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'grey',
  },
  icon: {
    width: 45,
    height: 45,
  },
  button: {
    // flex: 1,
    // width: null,
    resizeMode: 'contain',
  },
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    padding: 5,
    paddingBottom: 35,
    backgroundColor: 'transparent',
  },
  top: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '45%',
    // backgroundColor: '#666',
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 75,
    // backgroundColor: '#888',
  },
  bottom: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 150,
    // backgroundColor: '#aaa',
  },
  headingText: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainBox: {
    alignItems: 'center',
    width: '40%',
  },
  h2: {
    fontSize: 14,
    fontWeight:'bold',
    color: '#ffb401',
  },
  h3: {
    fontSize: 18,
    fontWeight:'normal',
    color: '#fff',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  onair: {
    // flex: 1
  },
  onairButton: {
    // flex: 1
  },
  hamburger: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 36,
    textAlign: 'center', 
  },
  switch: {
    // flex: 1,
    alignItems: 'center',
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    // resizeMode: 'cover',
  },
});

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  artist: state.login.artist,
  showModal: state.login.showModal,
});

export default connect(mapStateToProps)(ArtistAdmin);
