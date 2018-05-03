import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Image, TouchableOpacity, Text, CameraRoll, ScrollView } from 'react-native';
import { connect } from 'react-redux';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import ArtistForm from './ArtistForm';
import { loginArtist } from '../../redux/actions/ActionCreator';

import { createArtist, updateArtist } from '../api';
import upload from '../../utils/upload';
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
      photos: [],
		};
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

  async onSubmit() {
    const type = this.getType();
    const roles = this.getRoles();
    const {
      name,
      artistImageURL,
      genre,
    } = this.state;
    const artistData = {
      userId: this.props.user._id,
      name,
      artistImageURL,
      genre,
      roles,
      type,
    }
    try {
      const response = await createArtist(artistData);
      this.props.loginArtist(response.artist);
      this.setState({successMessage: `Successfully created ${this.state.name}!`});
    } catch(err) {
      console.log('error:', err);
      this.setState({errorMessage: `Problem creating ${this.state.name}`});
    }
  }

  uploadImage(uri) {
    upload(uri, url => {
      this.setState({
        artistImageURL: url,
        photos: [],
      });
    });
  }

  cameraRoll() {
    CameraRoll.getPhotos({
       first: 100,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
       console.log('test', r);
     })
     .catch(err => {
       console.log('Error loading images', err);
     });
  }

  showCam() {
    console.log('showCam props', this.props);
    this.props.navigation.navigate('CameraScreen');
  }

  render() {
    console.log('ArtistFormWrapper render state', this.props);
    const imgW = (width - 40) / 4;
    const showPhotos = this.state.photos.length;
    return (
      <View>
        <ArtistForm
          handleChange={this.handleChange.bind(this)}
          handleRoleChange={this.handleRoleChange.bind(this)}
          handleChooseType={this.handleChooseType.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          genre={this.state.genre}
          name={this.state.name}
          errorMessage={this.state.errorMessage}
          successMessage={this.state.successMessage}
          roles={this.state.roles}
          types={this.state.types}
          getType={this.getType.bind(this)}
          onPressCam={this.showCam.bind(this)}
          photo={this.props.artistProfile.image}
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
  // console.log('state', state);
  return {
  user: state.login.user,
  artist: state.login.artist,
  artistProfile: state.artist,
}};

const mapDispatchToProps = dispatch => ({
  loginArtist: payload => dispatch(loginArtist(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistFormWrapper);