import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import ArtistForm from "./ArtistForm";
import { loginArtist, logout } from "../../redux/actions/ActionCreator";

import { createArtist, updateArtist, getDataFromRef } from "../api";
import upload from "../../utils/upload";
// import UploadImage from 'http://widget.cloudinary.com/global/all.js';

const { width, height } = Dimensions.get("window");

class ArtistFormWrapper extends Component {
  static navigationOptions = ({ navigation }) => {
    // console.log('navigation', navigation);
    const { params = {} } = navigation.state;

    return {
      title: `${params.title || params.screen || "Profile"}`,
      headerTitleStyle: { textAlign: "center", alignSelf: "center" },
      headerStyle: {
        backgroundColor: `${params.bg || "red"}`
      },
      headerLeft: null
    };
  };

  constructor(props) {
    super(props);

    const artist = props.artist || {};
    const hasRole = key => (artist.roles || []).indexOf(key) > -1;
    const roles = {
      vocals: hasRole("vocals"),
      piano: hasRole("piano"),
      guitar: hasRole("guitar"),
      sax: hasRole("sax"),
      percussion: hasRole("percussion"),
      harmonica: hasRole("harmonica"),
      violin: hasRole("violin"),
      ukelele: hasRole("ukelele")
    };
    const types = {
      band: artist.type === "band",
      solo: artist.type === "solo"
      // duo: false,
    };
    this.state = {
      types,
      name: artist.name,
      artistNameComplete: "",
      artistImageURL: "",
      genre: artist.genre,
      roles,
      errorMessage: "",
      photo: artist.photo
    };
    // this.upload();
  }

  resetErrorMessage = () => this.setState({ errorMessage: "" });

  handleChange = field => this.setState(field);

  handleChooseType = fieldName => {
    const typeKeys = Object.keys(this.state.types);
    const newTypes = typeKeys.reduce((obj, k) => {
      obj[k] = k === fieldName;
      return obj;
    }, {});
    this.setState({ types: newTypes });
  };

  handleRoleChange = fieldName => {
    const newRoles = {
      ...this.state.roles,
      [fieldName]: !this.state.roles[fieldName]
    };
    this.setState({ roles: newRoles });
  };

  getType = () =>
    Object.keys(this.state.types).filter(k => this.state.types[k])[0];

  getRoles = () => {
    return Object.keys(this.state.roles).filter(k => this.state.roles[k]);
  };

  uploadImage = (uri, cb) => upload(uri, url => cb(url));

  onSubmit = async () => {
    const type = this.getType();
    const roles = this.getRoles();
    const { name, genre, photo } = this.state;
    let imageURL = "";
    if (photo) {
      try {
        imageURL = await this.uploadImage(photo);
      } catch (err) {
        console.log("error:", err);
        this.setState({ errorMessage: `Problem upload image ${photo}` });
      }
    }

    // console.log('imageURL', imageURL);
    const artistData = {
      userId: this.props.user._id,
      name,
      genre,
      roles,
      type,
      imageURL
    };
    // console.log('artist data', artistData); return;
    try {
      const artist = await createArtist(artistData);
      this.props.loginArtist(artist);
      this.setState({
        successMessage: `Successfully created ${this.state.name}!`
      });
    } catch (err) {
      console.log("error:", err);
      this.setState({ errorMessage: `Problem creating ${this.state.name}` });
    }
  };

  onChoosePhoto = photoName => {
    console.log("onChoosePhoto", photoName);
    this.setState({ photo: photoName });
  };

  showCam = () => {
    // console.log('showCam props', this.props);
    this.props.navigation.navigate("CameraScreen", {
      onChoosePhoto: this.onChoosePhoto
    });
  };

  navigate = pageName => () => {
    this.props.navigation.navigate(pageName, {
      name: pageName,
      artist: this.props.artist
    });
  };

  logout = () => {
    this.props.logout();
    this.navigate("Options")();
  };

  render() {
    // console.log('ArtistFormWrapper render state', this.props);
    const {
      name,
      genre,
      roles,
      types,
      photo,
      successMessage,
      errorMessage
    } = this.state;
    return (
      <View>
        <ArtistForm
          handleChange={this.handleChange}
          handleRoleChange={this.handleRoleChange}
          handleChooseType={this.handleChooseType}
          onSubmit={this.onSubmit}
          genre={genre}
          name={name}
          errorMessage={errorMessage}
          successMessage={successMessage}
          roles={roles}
          types={types}
          getType={this.getType}
          onPressCam={this.showCam}
          photo={photo}
        />
        <TouchableOpacity onPress={this.logout}>
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cambtn: {
    flexDirection: "row",
    width: 100,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  photos: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

const mapStateToProps = state => {
  // console.log('state', state);
  return {
    user: state.login.user,
    artist: state.login.artist,
    artistProfile: state.artist
  };
};

const mapDispatchToProps = dispatch => ({
  loginArtist: payload => dispatch(loginArtist(payload)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistFormWrapper);
