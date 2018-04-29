import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser, fetchUser, createArtist, fetchUserArtist } from '../api';
import { loginUser, loginArtist } from '../../redux/actions/ActionCreator';
import { saveStorage } from '../LocalStorage';
import UserForm from './UserForm';

class UserFormWrapper extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errorMessage: '',
      hidePassword: true,
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
      } else if (type === 'LogIn') {
        userResponse = await fetchUser(credentials);
      }
      user = userResponse.user;

      if (!user) {
        throw 'User does not exist';
      }
      saveStorage({user});
      // console.log('onSubmit this.props', this.props);
      this.props.loginUser(user);
    } catch(err) {
      console.log('error:', err);
      this.setState({errorMessage: err});
      this.props.logout();
    }
    if (this.props.userType === 'ARTIST' && user && type === 'LogIn') {
      artist = await this.getArtist(user._id);
    }
    this.props.navigateTo();

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
    // console.log('render userType', this.props.userType);
	  return (
      <UserForm
        handleChange={this.handleChange.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        email={this.state.email}
        password={this.state.password}
        errorMessage={this.state.errorMessage}
        togglePassword={this.togglePassword.bind(this)}
        hidePassword={this.state.hidePassword}
      />
	  );
	}

}

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