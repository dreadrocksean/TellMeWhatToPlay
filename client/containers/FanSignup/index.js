import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import Modal from '../../components/Modal';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import FormError from '../../components/FormError';
import continueButton from '../../images/buttons/continue_btn.png';

import { loginUser } from '../../redux/actions/ActionCreator';
import { fetchUser } from '../../services/api';
import { saveStorage } from '../../services/LocalStorage';

const { width, height } = Dimensions.get('window');

class FanSignup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    };
    this.hide = this.hide.bind(this);
    this.continue = this.continue.bind(this);
  }

  hide() {
    this.props.setShowModal(false);
  }

  onModalChange(field, value) {
    this.setState({
      [field]: value,
      errorMessage: null,
    });
  }

  async continue() {
    const { email, password } = this.state;
    try {
      const response = await fetchUser({ email, password });
      const user = response.user;
      console.log('Setlist continue', user);
      if (user) {
        this.props.setShowModal(false);
        this.props.loginUser(user);
        await saveStorage({user});
      } else {
        this.setState({errorMessage: 'User not found'})
      }
    } catch(err) {
      console.log('Error: user not found.', err);
      this.setState({errorMessage: err.message})
    }
  }

  render() {
    const { errorMessage, email, password } = this.state;
    return this.props.showModal ?
      (
        <Modal dismiss={this.hide} >
          <AppText
            style={{flex:1}}
            textStyle={{fontFamily: 'montserrat-regular'}}
          >LOG IN OR CREATE AN ACCOUNT</AppText>
          {errorMessage && <FormError>{errorMessage}</FormError>}
          <AppTextInput
            style={{flex:1}}
            placeholder='Email'
            onChangeText={val => this.onModalChange.call(this, 'email', val)}
            value={email}
          />
          <AppTextInput
            style={{flex:1}}
            placeholder='Password'
            onChangeText={val => this.onModalChange.call(this, 'password', val)}
            value={password}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.imageWrapper}
            onPress={this.continue}>
            <Image style={styles.image} source={continueButton} />
          </TouchableOpacity>
        </Modal>
      )
      : null;
  };

}

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload)),
});

export default connect(null, mapDispatchToProps)(FanSignup);