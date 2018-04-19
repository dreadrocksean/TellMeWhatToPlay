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
		this.state = {
			artistName: '',
      artistNameComplete: '',
      artistImageURL: '',
      artistGenre: '',
      artistRoles: [],
			errorMessage: '',
      photos: [],
		};
    // this.upload();
	}
  componentWillReceiveProps () {
  }

  componentDidMount () {
    console.log('this.props', this.props);
  }

  resetErrorMessage() {
  	this.setState({errorMessage: ''});
  }

  handleChange(field) {
    const key = Object.keys(field)[0];
    this.setState({[key]: field[key]});
    this.setState(field);
  }

  async onSubmit() {
    const {
      artistName,
      artistImageURL,
      artistGenre,
      artistRoles
    } = this.state;
    const artistData = {
      artistName,
      artistImageURL,
      artistGenre,
      artistRoles,
    }
    try {
      const response = await createArtist(artistData);
      this.props.dispatch(loginArtist(response.artist));
      this.setState({successMessage: `Successfully created ${this.state.artistName}!`});
    } catch(err) {
      console.log('error:', err);
      this.setState({errorMessage: `Problem creating ${this.state.artistName}`});
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
    this.props.navigation.navigate('CameraScreen');
  }

  render() {
    const imgW = (width - 40) / 4;
    const showPhotos = this.state.photos.length;
    return (
      <View>
        <ArtistForm
          handleChange={this.handleChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          artistNameComplete={this.state.artistNameComplete}
          artistName={this.state.artistName}
          submitText={'Add Me'}
          errorMessage={this.state.errorMessage}
          successMessage={this.state.successMessage}
        />
        <TouchableOpacity
          style={styles.cambtn}
          onPress={this.showCam}
        >
          <Text>CAM</Text>
        </TouchableOpacity>
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

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = () => ({
  loginArtist
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistFormWrapper);