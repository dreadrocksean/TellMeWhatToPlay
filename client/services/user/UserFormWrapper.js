import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser, fetchUser, createArtist, fetchArtist } from '../api';
import * as ActionCreators from '../../redux/actions/ActionCreator';
import { saveStorage } from '../LocalStorage';
import UserForm from './UserForm';

class UserFormWrapper extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errorMessage: '',
		};
	}

  resetErrorMessage() {
  	this.setState({errorMessage: ''});
  }

  handleChange(field) {
    const key = Object.keys(field)[0];
    this.setState({[key]: field[key]});
    this.setState(field);
  }

  async onSubmit(type) {
    // console.log('onsubmit props', this.props);
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    let user, userResponse, errorMessage;
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
      console.log('props', this.props);
      this.props.loginUser(user);
    } catch(err) {
      console.log('error:', err);
      this.setState({errorMessage: err});
      this.props.logout();
    }
    if (this.props.userType === 'ARTIST' && user && type === 'LogIn') {
      this.getArtist(user._id);
    }
  }

  async getArtist(userId) {
    try {
      const response = await fetchArtist({userId});
      this.props.loginArtist(response.artist);
      saveStorage({artist: response.artist});
    } catch(err) {
      console.log('error:', err);
    }
  }

  render() {
    console.log('render userType', this.props.userType);
	  return (
      <UserForm
        handleChange={this.handleChange.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        email={this.state.email}
        password={this.state.password}
        errorMessage={this.state.errorMessage}
      />
	  );
	}

}

const mapStateToProps = state => {
  return {
    userType: state.login.userType,
}};

export default connect(mapStateToProps, ActionCreators)(UserFormWrapper);