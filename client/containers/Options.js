import React, { Component } from 'react';
import {
  Dimensions, StyleSheet,
  TouchableHighlight, TouchableOpacity,
  Text, View, AsyncStorage, Image
} from 'react-native';
import { Font } from 'expo';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Button as RNButton, Icon } from 'react-native-elements';
// import { Provider } from 'unstated';

import { saveStorage, loadStorage } from '../services/LocalStorage';
import { fetchUserArtist } from '../services/api';
import { loginUser, loginArtist, logout, guestTypeFan, guestTypeArtist } from '../redux/actions/ActionCreator';
import * as ActionTypes from '../redux/actions/ActionTypes';

import DefaultContainer from './DefaultContainer';
import { updateHeader } from '../utils/UpdateHeader';
import AppText from '../components/AppText';
import CheckBox from '../components/CheckBox/';
import RadioButton from '../components/RadioButton/';

import bg from '../images/bg.png';
import fanButton from '../images/buttons/fan_btn.png';
import artistButton from '../images/buttons/artist_btn.png';

const {height, width} = Dimensions.get('window');

class Options extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: `${params.title || params.screen || 'Options'}`,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
      headerStyle:{
        backgroundColor: `${params.bg || 'red'}`,
      },
      headerLeft: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {showModal: false, photos: [], fontLoaded: false};
    this.checkLocalUserStorage();
    this.checkLocalArtistStorage();
  }

  async componentDidMount() {
    // console.log('Options componentDidMount', this.props.navigation);
    await Font.loadAsync({
      'montserrat-bold': require('../assets/fonts/montserrat/Montserrat-Bold.otf'),
      'montserrat-black': require('../assets/fonts/montserrat/Montserrat-Black.ttf'),
      'montserrat-regular': require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
      'montserrat-thin': require('../assets/fonts/montserrat/Montserrat-Thin.ttf'),
    });
    this.setState({fontLoaded: true});
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps this.props', this.props.userType, nextProps.userType);
    if (
      nextProps.artist === this.props.artist
      && nextProps.user === this.props.user
      && nextProps.userType === this.props.userType
      && nextProps.authorized === this.props.authorized
    ) {
      // console.log('no change');
      return;
    }
    // console.log('updating header');
    updateHeader(nextProps);
  }

  async checkLocalUserStorage() {
    //Set store on mount
    try {
      // console.log('checkLocalUserStorage user', this.props);
      const user = await loadStorage('user');
    // console.log('Options user', user);
      if (!this.props.user && user) {
        this.props.loginUser(user);
        this.getArtist(user._id);
      } else if(!user && !this.props.user) {
        throw Error('No user exists');
      }
      updateHeader(this.props);
    } catch(err) {
        console.log('load storage error', err);
        this.setState({errorMessage: err});
        this.props.logout();
        updateHeader(this.props);
    }
  }

  async getArtist(userId) {
    try {
      // console.log('getArtist userId', userId);
      const { artist } = await fetchUserArtist({userId});
      // console.log('getArtist', artist);
      if (!artist) {
        artist = await this.checkLocalArtistStorage();
      }
      this.props.loginArtist(artist);
      saveStorage({artist: artist});
    } catch(err) {
      this.setState({errorMessage: err});
    }
  }

  async checkLocalArtistStorage() {
    try {
      await loadStorage('artist');
    } catch(err) {
      this.setState({errorMessage: err});
    }
  }

  onClick(userType) {
    const routeName = this.getRouteName(userType);
    // console.log('onClick', routeName);
    this.props.navigation.navigate(routeName, {name: routeName});
  }

  getRouteName(userType) {
      // return 'UserSignup';
      // return 'ArtistSignup';

    const { user, artist, authorized, guestTypeArtist, guestTypeFan } = this.props;
    switch (userType) {
      case 'ARTIST': {
        guestTypeArtist();
        if(!authorized) { return 'UserSignup'; }
        else if(!artist) { return 'ArtistSignup'; }
        return 'ArtistAdmin';
      }
      case 'FAN': {
        guestTypeFan();
        return 'ArtistList';
      }
      default: return null;
    }
  }

  renderButton (text, onPress) {
    return (
      <TouchableHighlight onPress={onPress} style={styles.close}>
        <View>
          <Text
            style={{
              color: '#d4d4ff',
              fontSize: 20,
              alignItems: 'center',
              textAlign: 'center',
            }}
          >{text}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  toggleCheckbox() {
    this.setState({checkbox: !this.state.checkbox})
  }

  toggleRadioButton() {
    this.setState({radioButton: !this.state.radioButton})
  }

  render() {
    if (!this.state.fontLoaded) {return null;}
    // console.log('render');
    const { showModal } = this.state;
    const { authorized, artist, navigation, userType } = this.props;
    const isArtist = userType === 'ARTIST';
    return (
      <DefaultContainer>
        <View style={styles.container}>
          {<View style={{alignItems: 'center'}} >
            <TouchableHighlight
              onPress={this.onClick.bind(this, 'FAN')}
            >
              <View>
                <Image
                  source={fanButton}
                  resizeMode={'cover'}
                />
              </View>
            </TouchableHighlight>
            <View style={styles.textSeparator}>
              <View style={styles.line} />
              { this.state.fontLoaded && (
                <AppText style={[{flex: 2}]}>OR</AppText>
              )}
              <View style={styles.line} />
            </View>
            <TouchableHighlight
              onPress={this.onClick.bind(this, 'ARTIST')}
            >
              <View >
                <Image
                  source={artistButton}
                  resizeMode={'cover'}
                />
              </View>
            </TouchableHighlight>
            { this.state.fontLoaded && (
              <AppText style={[styles.textCustomPos]}>PLEASE SELECT
              </AppText>
            )}
          </View>}
        </View>
      </DefaultContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    color: 'rgba(220,220,255,0.9)',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    // fontFamily: 'montserrat-bold',
  },
  textCustomPos: {
    position: 'absolute',
    top: -60,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 25,
    width: 25,
    // borderRadius: 25,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  imageButton: {
    height: 70,
    width: width * 0.8,
    backgroundColor: 'red',
    // borderColor: 'white',
    // borderWidth: 4,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonImage: {
    position: 'absolute',
    borderRadius: 35,
    flex: 1,
    zIndex: -1,
    top: 0,
    left: 0,
    height: 70,
    width: width * 0.8,
    borderColor: 'white',
    borderWidth: 4,
  },
  buttonContent: {
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  textSeparator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    width: width * 0.6,
  },
  line: {
    borderBottomColor: 'rgba(220,220,255,0.9)',
    borderBottomWidth: 3,
    flex: 3,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    // margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const mapStateToProps = state => {
  // console.log('mapStateToProps state', state);
  return {
    authorized: state.login.authorized,
    userType: state.login.userType,
    artist: state.login.artist,
    user: state.login.user,
    errorMessage: state.login.errorMessage,
}};

const mapDispatchToProps = dispatch => {
  // console.log('mapStateToProps state', state);
  return {
    logout: () => dispatch(logout()),
    loginUser: user => dispatch(loginUser(user)),
    loginArtist: artist => dispatch(loginArtist(artist)),
    guestTypeFan: () => dispatch(guestTypeFan()),
    guestTypeArtist: () => dispatch(guestTypeArtist()),
}};

export default connect(mapStateToProps, mapDispatchToProps)(Options);
