import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { createUser, fetchUser, createArtist, fetchUserArtist } from '../api';
import { loginUser, loginArtist } from '../../redux/actions/ActionCreator';
import { saveStorage } from '../LocalStorage';
import UserForm from './UserForm';
import AppModal from '../../components/Modal';
import AppText from '../../components/AppText';

import successIcon from '../../images/icons/success_icon.png';
import continueButton from '../../images/buttons/continue_btn.png';

class UserFormWrapper extends Component {

	constructor(props) {
		super(props);
		this.state = {
      hasAccount: false,
			email: '',
			password: '',
      fname: '',
      lname: '',
      zip: '',
      successMessage: null,
			errorMessage: null,
      hidePassword: true,
      submitType: null,
		};
	}

  async componentDidUpdate() {
  }

  resetErrorMessage() {
  	this.setState({errorMessage: ''});
  }

  handleChange(field) {
    // const key = Object.keys(field)[0];
    // this.setState({[key]: field[key]});
    this.setState(field);
  }

  onHasAccountChange(hasAccount) {
    this.setState({ hasAccount });
  }

  togglePassword() {
    this.setState({hidePassword: !this.state.hidePassword});
  }

  async onSubmit(type) {
    // console.log('onsubmit props', this.props);
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    let user, artist, userResponse, errorMessage;
    try {
      if (!credentials.email.trim() || !credentials.password.trim()) {
        throw 'Fields cannot be empty';
      }
      if (type === 'SignUp') {
        userResponse = await createUser(credentials);
        this.setState({
          successMessage: 'Your Account Was Successfully Created',
          errorMessage: null,
          submitType: type
        });
      } else if (type === 'LogIn') {
        userResponse = await fetchUser(credentials);
        this.setState({
          successMessage: 'You Were Successfully Logged In',
          errorMessage: null,
          submitType: type
        });
      }
      user = userResponse.user;

      if (!user) {
        throw 'User does not exist';
      }
      await saveStorage({user});
      // console.log('onSubmit this.props', this.props);
      this.props.loginUser(user);
    } catch(err) {
      console.log('error:', err);
      this.setState({
        successMessage: null,
        errorMessage: err,
      });
      this.props.logout();
      await saveStorage({user: null});
    }

  }

  async continue() {
    console.log('this.props', this.props);
    const { userType, user, navigateTo } = this.props;
    console.log('continue', userType, user, navigateTo, this.state.submitType);
    if (
      userType === 'ARTIST'
      && user && this.state.submitType === 'LogIn') {
      artist = await this.getArtist(user._id);
    }
    navigateTo();
  }

  async getArtist(userId) {
    try {
      const response = await fetchUserArtist({userId});
      const artist = response.artist;
      // console.log('getArtist', response.artist);
      this.props.loginArtist(artist);
      saveStorage({artist});
      return artist;
    } catch(err) {
      console.log('error:', err);
    }
  }

  render() {
    console.log('render state', this.state);
    const { email, password, fname, lname, zip,
      successMessage, errorMessage,
    } = this.state;
    const fieldValues = { email, password, fname, lname, zip };
	  return successMessage ?
      <AppModal>
          <View style={{width: '45%', flex:1}}>
            <Image style={[styles.image]}
              source={successIcon} />
          </View>
          <AppText
            textStyle={{ fontWeight: 'normal', fontSize: 18 }}
          >{successMessage}</AppText>
          <TouchableOpacity style={{alignSelf: 'stretch', flex:1}}
            onPress={this.continue.bind(this)}>
            <Image style={styles.image} source={continueButton} />
          </TouchableOpacity>
      </AppModal> : 
      <UserForm
        hasAccount={this.state.hasAccount}
        onHasAccountChange={this.onHasAccountChange.bind(this)}
        handleChange={this.handleChange.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        fieldValues={fieldValues}
        errorMessage={this.state.errorMessage}
        togglePassword={this.togglePassword.bind(this)}
        hidePassword={this.state.hidePassword}
      />
	}

}

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    justifyContent: 'space-around',
    // width: '80%',
    // backgroundColor: '#281955',
    // borderWidth: 2,
    // borderColor: 'white',
    // borderRadius: 10,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  }
});

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload)),
  loginArtist: payload => dispatch(loginArtist(payload))
});

const mapStateToProps = state => {
  return {
    userType: state.login.userType,
    artist: state.login.artist,
    user: state.login.user,
}};

export default connect(mapStateToProps, mapDispatchToProps)(UserFormWrapper);