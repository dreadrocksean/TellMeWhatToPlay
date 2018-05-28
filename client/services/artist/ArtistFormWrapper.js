import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { FileSystem, ImagePicker, Constants, Camera, Permissions } from 'expo';

// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import ArtistForm from './ArtistForm';
import { loginArtist } from '../../redux/actions/ActionCreator';

import { createArtist, updateArtist } from '../api';
import CloudinaryUpload from '../../utils/upload';
// import UploadImage from 'http://widget.cloudinary.com/global/all.js';

const { width, height } = Dimensions.get('window');

class ArtistFormWrapper extends Component {

  static navigationOptions = ({ navigation }) => {
    // console.log('navigation', navigation);
    const { params = {} } = navigation.state;

    return {
      title: `${params.title || params.screen || 'Profile'}`,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
      headerStyle:{
        backgroundColor: `${params.bg || 'red'}`,
      },
      headerLeft: null
    };
  };

	constructor(props) {
		super(props);

    const artist = props.artist || {};
    const hasRole = key => (artist.roles || []).indexOf(key) > -1;
    const roles = {
      vocals: hasRole('vocals'),
      piano: hasRole('piano'),
      guitar: hasRole('guitar'),
      sax: hasRole('sax'),
      percussion: hasRole('percussion'),
      harmonica: hasRole('harmonica'),
      violin: hasRole('violin'),
      ukelele: hasRole('ukelele'),
    };
    const types = {
      band: artist.type === 'band',
      solo: artist.type === 'solo',
      // duo: false,
    };
		this.state = {
      types,
			name: artist.name,
      artistNameComplete: '',
      artistImageURL: '',
      genre: artist.genre,
      roles,
			errorMessage: '',
      photo: artist.imageURL,
		};
    // console.log('ArtistFormWrapper this.state.photo', this.state.photo);
    // this.upload();
	}

  resetErrorMessage() {
  	this.setState({errorMessage: ''});
  }

  handleChange(field) {
    this.setState(field);
  }

  handleChooseType(fieldName) {
    const typeKeys = Object.keys(this.state.types);
    const newTypes = typeKeys.reduce(
      (obj, k) => {
        obj[k] = k === fieldName;
        return obj;
      }, {}
    );
    this.setState({ types: newTypes });
  }

  handleRoleChange(fieldName) {
    const newRoles = {
      ...this.state.roles,
      [fieldName]: !this.state.roles[fieldName]
    };
    this.setState({roles: newRoles});
  }

  getType() {
    return Object.keys(this.state.types)
      .filter(k => this.state.types[k])[0];
  }

  getRoles() {
    return Object.keys(this.state.roles)
      .filter(k => this.state.roles[k]);
  }

  uploadImage(uri, cb) {
    CloudinaryUpload(uri, url => cb(url));
  }

  async onSubmit() {
    const type = this.getType();
    const roles = this.getRoles();
    const edit = this.props.artistEdit;
    const {
      name,
      genre,
      photo,
    } = this.state;
    const imageURL = await this.uploadImage(photo);

    console.log('ArtistFormWrapper imageURL', imageURL);
    console.log('ArtistFormWrapper photo', photo);
    const artistData = {
      userId: this.props.user._id,
      name,
      genre,
      roles,
      type,
      imageURL,
    }
    // console.log('artist data', artistData); return;
    if (edit) {
      this.edit(artistData);
    } else {
      this.create(artistData);
    }
  }

  async edit(artistData) {
    try {
      const response = await updateArtist(artistData);
      this.props.loginArtist(response.artist);
      this.setState({successMessage: `Successfully created ${this.state.name}!`});
    } catch(err) {
      console.log('error:', err);
      this.setState({errorMessage: `Problem creating ${this.state.name}`});
    }
  }

  async create(artistData) {
    try {
      const response = await createArtist(artistData);
      this.props.loginArtist(response.artist);
      this.setState({successMessage: `Successfully created ${this.state.name}!`});
    } catch(err) {
      console.log('error:', err);
      this.setState({errorMessage: `Problem creating ${this.state.name}`});
    }
  }

  onChoosePhoto(photoName) {
    // console.log('onChoosePhoto', photoName);
    const photo = `${FileSystem.documentDirectory}photos/${photoName}`;
    this.setState({ photo });
  }

  showCam() {
    return this.pickImage();
    // console.log('showCam props', this.props);
    this.props.navigation.navigate('CameraScreen', {onChoosePhoto: this.onChoosePhoto.bind(this)});
  }

  async pickImage() {
    const results = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (results.status !== 'granted') {
      console.log('Camera permissions not granted');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
  }

  render() {
    // console.log('ArtistFormWrapper render props', this.props);
    const { name, genre, roles, types,
      successMessage, errorMessage, photo} = this.state;
    return (
      <View>
        <ArtistForm
          handleChange={this.handleChange.bind(this)}
          handleRoleChange={this.handleRoleChange.bind(this)}
          handleChooseType={this.handleChooseType.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          genre={genre}
          name={name}
          errorMessage={errorMessage}
          successMessage={successMessage}
          roles={roles}
          types={types}
          getType={this.getType.bind(this)}
          onPressCam={this.showCam.bind(this)}
          photo={photo}
          edit={this.props.artistEdit}
        />
      </View>
    );
	}

}

const styles = StyleSheet.create({
  cambtn: {
    flexDirection: 'row',
    width: 100,
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photos: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

const mapStateToProps = state => {
  console.log('ArtistFormWrapper mapStateToProps', state);
  return {
    user: state.login.user,
    artist: state.login.artist,
    artistEdit: state.artist.artistEdit,
}};

const mapDispatchToProps = dispatch => ({
  loginArtist: payload => dispatch(loginArtist(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistFormWrapper);