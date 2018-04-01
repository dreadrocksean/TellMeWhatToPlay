import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modal'; // 2.4.0
import {
  Dimensions, StyleSheet, Text, View, AsyncStorage, Image, Switch, TouchableOpacity
} from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';
import MaterialSwitch from './MaterialSwitch';
import { Provider, Subscribe, Container } from 'unstated';
import { UserContainer } from '../stores/UserContainer';

import UserForm from './UserForm';
import ArtistForm from './ArtistForm';
import { createUser, fetchUser, fetchArtist, createArtist, updateArtist } from '../constants/api';
import onair_off from '../images/onair_off_small.png';
import onair_on from '../images/onair_on_small.png';

const {height, width} = Dimensions.get('window');

class ArtistAdmin extends Component {

  static navigationOptions = {
    title: 'Artist Admin',
  };

  static defaultProps = { createUser, fetchUser, fetchArtist, createArtist, updateArtist };

  state = {
    user: null,
    onAir: false,
    showModal: false,
    authorized: false,
    edit_email: '',
    edit_password: '',
  };

  async loadStorage() {
    try {
      const userJson = await AsyncStorage.getItem('user');
      const user = JSON.parse(userJson).user;
      const artistJson = await AsyncStorage.getItem('artist');
      const artist = JSON.parse(artistJson).artist;
      this.setState({
        user, artist,
        showModal: !user,
        authorized: !!user,
      });
    } catch(e) {
      console.log('Error getting storage email: ', e);
      this.setState({
        email: null,
        showModal: true,
        authorized: false,
      });
    }
  }

  _handleStorage(models) {
    if (!models) { return; }
    const setStorage = async obj => {
      await AsyncStorage
        .setItem(Object.keys(obj)[0], JSON.stringify(obj));
    };
    if (Array.isArray(models)) {
      models.forEach(obj => {
        if (obj) { setStorage(obj); }
      });
    } else { setStorage(models); }
  }

  componentDidUpdate(prevProps, prevState) {
    const { showModal, authorized } = this.state;
    if (!showModal && !authorized) {
      this.props.navigation.goBack();
    }
  }

  componentDidMount() {
    // AsyncStorage.removeItem('user');
    this.loadStorage();
  }

  navigate(pageName) {
    const { user, artist } = this.state;
    const {navigate} = this.props.navigation;
    navigate(pageName, { name: pageName, artist });
  }

  onSwitchChange(field) {
    this.setState({onAir: !this.state.onAir});
  }

  renderButton (text, onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  handleChange(field) {
    const key = Object.keys(field)[0];
    this.setState({['edit_'+key]: field[key]});
    this.setState(field);
  }

  onSubmitUser(type) {
    if (type === 'SignUp') {
      this.addUser();
    } else if (type === 'LogIn') {
      this.logInUser();
    }
  }

  async addUser() {
    const {email, password} = this.state;
    if (!email || !password) { return; }
    let user;
    try {
      const data = await this.props.createUser({ email, password });
      user = (data || {}).user;
      console.log('SUCCESS! - user created! ->', user);
    } catch (err) {
      console.error('ERROR creating user', err);
      this.setState({showModal: true, authorized: false})
    }
    this._handleStorage({user});
    this.setState({user, showModal: false, authorized: true});
    console.log('state ->', this.state);
  }

  async logInUser() {
    const {email, password} = this.state;
    let user, artist;
    if (!email || !password) { return; }

    // Get User
    try {
      const userData = await this.props.fetchUser({ email, password });
      user = (userData || {}).user;
      if (!user) {
        throw 'User with email/password does not exist!';
      }
      console.log('SUCCESS! - user logged in! -> ', user);
    } catch (err) {
      return this.handleError('ERROR logging in user -> ', err);
    }

    // Get Artist
    try {
      const artistData = await this.fetchUserArtist(user._id);
      artist = (artistData || {}).artist;
      if (!artist) {
        throw 'User has no artist';
      }
      console.log('Got Artist!! ->', artist);
    } catch (err) {
      return this.handleError('ERROR getting artist ->' , err);
    }

    // Store data
    this._handleStorage([{user}, {artist}]);
    this.setState({user, artist, showModal: false, authorized: true});
    // console.log('state ->', this.state);
  }

  handleError(err, msg) {
    console.log(msg, err);
    this.setState({
      showModal: true,
      authorized: false,
      errorMessage: msg,
    });
  }

  async fetchArtist(userId) {
    return await this.props.fetchArtist({ userId });
  }

  async createArtist() {
    const {artistName} = this.state;
    if (!artistName) { return; }
    try {
      const data = await this.props.createArtist({ userId: this.state.user._id, artistName });
      const artist = (data || {}).artist;
      this.setState({artist, showModal: false, authorized: true});
      const stored = await AsyncStorage
        .setItem('artist', JSON.stringify(artist));

    } catch (err) {
      console.error('ERROR creating artist', err);
      this.setState({showModal: true, authorized: false})
    }
  }

  renderUserForm() {
    return (
      <UserForm
        handleChange={this.handleChange.bind(this)}
        onSubmit={this.onSubmitUser.bind(this)}
        edit_email={this.state.edit_email}
        edit_password={this.state.edit_password}
        errorMessage={this.state.errorMessage}
      />
    )
  }

  renderArtistForm() {
    return (
      <ArtistForm
        handleChange={this.handleChange.bind(this)}
        onSubmit={this.createArtist.bind(this)}
        edit_name={this.state.edit_email}
        name={this.state.name}
        command={'Add Me'}
        errorMessage={this.state.errorMessage}
      />
    )
  }

  renderModalContent () {
    const { authorized, artist } = this.state;
    return (
      <View style={styles.modalContent}>
        {!authorized && this.renderUserForm()}
        {authorized && !artist && this.renderArtistForm()}
        {this.renderButton(
          'Cancel',
          () => {
            // this.props.navigation.goBack();
            this.setState({
              showModal: false,
              authorized: false,
            })
          }
        )}
      </View>
    )
  }

  render() {
    const { user, artist, onAir, authorized, showModal } = this.state;
    return (
      <View style={styles.container}>
        {user && <Text>{user._id}</Text>}
        {artist && <Text>{artist.name}</Text>}
        <RNButton style={styles.button}
          borderRadius={10}
          icon={{name: 'music', type: 'font-awesome'}}
          onPress={this.navigate.bind(this, 'Profile')}
          title={'Edit Profile'}
          fontSize={36}
          buttonStyle={styles.button}
        />
        <RNButton
          borderRadius={10}
          icon={{name: 'music', type: 'font-awesome'}}
          onPress={this.navigate.bind(this, 'SetList')}
          title={'Manage SetList'}
          fontSize={36}
          buttonStyle={styles.button}
        />
        {onAir && <Image source={onair_on} />}
        {!onAir && <Image source={onair_off} />}
        <RNButton
      
        />
        <Switch
          onValueChange={this.onSwitchChange.bind(this)}
          value={onAir}
        />
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
          {this.renderModalContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 5,
  },
  button: {
    flex: 1,
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // resizeMode: 'cover',
  },


  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
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


export default withNavigation(ArtistAdmin);


