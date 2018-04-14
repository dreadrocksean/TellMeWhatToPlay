import React, { Component } from 'react';
import {
  Dimensions, StyleSheet,
  TouchableHighlight, TouchableOpacity,
  Text, View, AsyncStorage, Image
} from 'react-native';
import Modal from 'react-native-modal';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Button as RNButton, Icon } from 'react-native-elements';
// import { Provider } from 'unstated';

import { guestTypeArtist, guestTypeFan, loginArtist, loginUser, logout } from '../redux/actions/ActionCreator';
import { loadStorage } from '../services/LocalStorage';
import { updateHeader } from '../utils/UpdateHeader';
import UserFormWrapper from '../services/user/UserFormWrapper';
import ArtistFormWrapper from '../services/artist/ArtistFormWrapper';

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

  state = {showModal: false};

  async componentDidMount() {
    this.checkLocalUserStorage();
    this.checkLocalArtistStorage();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.artist === this.props.artist
      && nextProps.user === this.props.user
      && nextProps.authorized === this.props.authorized
    ) {
      // console.log('no change');
      return;
    }
    updateHeader(nextProps);
  }

  async checkLocalUserStorage() {
    //Set store on mount
    const user = await loadStorage('user');
    if (!this.props.user && user) {
      this.props.dispatch(loginUser(user));
    } else if(!user) {
      this.props.dispatch(logout());
    }
    updateHeader(this.props);
    return !!user;
  }

  async checkLocalArtistStorage() {
    const artist = await loadStorage('artist');
    if (!this.props.artist && artist) {
      this.props.dispatch(loginArtist(artist));
    }
    return !!artist;
  }

  async navigate(pageName) {
console.log('pageName', pageName);
    const {navigate} = this.props.navigation;
    const action = pageName === 'ArtistAdmin'
      ? guestTypeArtist() : guestTypeFan();
    this.props.dispatch(action);
    const isUserStored = await !this.checkLocalUserStorage();
    if (pageName === 'ArtistAdmin' &&
      (
        (!isUserStored && !this.props.user) ||
        !this.props.artist
      )
    ) {
      this.setState({showModal: true});
      return;
    }

    navigate(pageName, {
      name: pageName,
    })
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

  render() {
    // console.log('props', this.props);
    const { showModal } = this.state;
    const { authorized, artist, navigation, userType } = this.props;
    const isArtist = userType === 'ARTIST';
    return (
        <View style={styles.container}>
          <Image source={bg}  style={styles.backgroundImage} />
          <View style={{alignItems: 'center'}} >
            <TouchableHighlight
              onPress={this.navigate.bind(this, 'ArtistList')}
            >
              <View >
                <Image
                  source={fanButton}
                  resizeMode={'cover'}
                />
              </View>
            </TouchableHighlight>
            <View style={styles.textSeparator}>
              <View style={styles.line} />
              <Text style={[styles.text, {flex: 2}]}>OR</Text>
              <View style={styles.line} />
            </View>
            <TouchableHighlight
              onPress={this.navigate.bind(this, 'ArtistAdmin')}
            >
              <View >
                <Image
                  source={artistButton}
                  resizeMode={'cover'}
                />
              </View>
            </TouchableHighlight>
            <Text style={[styles.text, styles.textCustomPos]}>PLEASE SELECT
            </Text>

            {
              (!authorized || !artist) && showModal &&
              <Modal  style={styles.modalContainer}
                isVisible={(!authorized && showModal) || !artist}
                backdropColor={'#000'}
                backdropOpacity={0.7}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
              >
                <View>
                  {!authorized && <UserFormWrapper
                    isArtist={isArtist}
                  />}
                  {authorized && !artist && <ArtistFormWrapper
                  />}
                  {this.renderButton(
                    'X',
                    () => {
                      this.setState({
                        showModal: false,
                      })
                    }
                  )}
                </View>
              </Modal>
            }

          </View>
        </View>
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
    fontSize: 24,
    textAlign: 'center',
    // fontFamily: 'cochin',
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
  return {
    authorized: state.login.authorized,
    userType: state.login.userType,
    artist: state.login.artist,
    user: state.login.user,
    errorMessage: state.login.errorMessage,
}};

export default connect(mapStateToProps)(Options);
