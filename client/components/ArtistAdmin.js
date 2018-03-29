import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modal'; // 2.4.0
import {
  Dimensions, StyleSheet, Text, View, AsyncStorage, Image, Switch, TouchableOpacity
} from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';
import MaterialSwitch from './MaterialSwitch';

import PersonForm from './PersonForm';
import { createPerson, updatePerson, createArtist, updateArtist } from '../constants/api';
import onair_off from '../images/onair_off_small.png';
import onair_on from '../images/onair_on_small.png';

const {height, width} = Dimensions.get('window');

class ArtistAdmin extends Component {

  static navigationOptions = {
    title: 'Artist Admin',
  };

  static defaultProps = { createPerson, updatePerson, createArtist, updateArtist };

  state = {
    user: null,
    onAir: false,
    showModal: true,
    authorized: false,
    edit_email: '',
    edit_password: '',
  };

  async loadStorage() {
    try {
      const user = await AsyncStorage.getItem('user');
      if (!user) { return; }
      this.setState({
        user,
        showModal: false,
        authorized: true,
      });
    } catch(e) {
      console.log('Error getting storage user: ', e);
      this.setState({
        user: null,
        showModal: true,
        authorized: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { showModal, authorized } = this.state;
    if (!showModal && !authorized) {
      this.props.navigation.goBack();
    }
  }

  componentDidMount() {
    this.loadStorage();
  }

  navigate(pageName) {
    const {navigate} = this.props.navigation;
    navigate(pageName, { name: pageName })
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

  async addPerson() {
    // this.addFakeArtist('Fake Artist');
    // return;
    const {email, password} = this.state;
    if (!email || !password) { return; }
    try {
      const newPerson = await this.props.createPerson({ email, password });
      console.log('Success!: ', newPerson);
      this.setState({showModal: false, authorized: true});
      // const stored = await AsyncStorage.setItem('name', newPerson);

    } catch (err) {
      console.error('ERROR creating person', err);
      this.setState({showModal: true, authorized: false})
    }
  }

  async addFakeArtist(name) { 
    try {
      const newArtist = await this.props.createArtist({ name });
      console.log('Success!: ', newArtist);
      this.setState({showModal: false, authorized: true});
      // const stored = await AsyncStorage.setItem('name', newArtist);

    } catch (err) {
      console.error('ERROR creating fake Artist', err);
      this.setState({showModal: true, authorized: false})
    }
  }

  renderPersonForm() {
    return (
      <PersonForm
        handleChange={this.handleChange.bind(this)}
        onSubmit={this.addPerson.bind(this)}
        edit_email={this.state.edit_email}
        edit_password={this.state.edit_password}
        command={'Sign Up'}
      />
    )
  }

  renderModalContent () {
    return (
      <View style={styles.modalContent}>
        {this.renderPersonForm()}
        {this.renderButton(
          'Cancel',
          () => {
            // this.props.navigation.goBack();
            this.setState({
              showModal: false,
              auth: false,
            })
          }
        )}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {/*{this.state.user && <Text>{this.state.user.email}</Text>}*/}
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
        {this.state.onAir && <Image source={onair_on} />}
        {!this.state.onAir && <Image source={onair_off} />}
        <RNButton

        />
        <Switch
          onValueChange={this.onSwitchChange.bind(this)}
          value={this.state.onAir}
        />
        <Modal  style={styles.modalContainer}
          isVisible={!this.state.authorized && this.state.showModal}
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


