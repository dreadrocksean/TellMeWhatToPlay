import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ImagePicker } from "expo";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { connect } from "react-redux";
import cloudinary from "cloudinary-core";

import { loginArtist } from "src/store/actions/ActionCreator";

import cloudinaryConfig from "src/utils/Cloudinary";
import styles from "./styles";
import Toolbar from "./toolbar";
import Gallery from "./gallery";

const cl = cloudinary.Cloudinary.new({ cloud_name: "demo" });

class CameraScreen extends Component {
  camera = null;

  state = {
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    hasCameraRollPermission: null,
    cameraType: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync({ base64: true });
    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures]
    });
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures]
    });
  };

  async componentDidMount() {
    const cam = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = cam.status === "granted";
    const roll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const hasCameraRollPermission = roll.status === "granted";

    this.setState({ hasCameraPermission, hasCameraRollPermission });
  }

  navigate = (pageName, params) => () => {
    this.props.navigation.navigate(pageName, {
      name: pageName,
      ...params
    });
  };

  onGalleryChoice = data => async () => {
    this.props.navigation.state.params.onChoosePhoto(data);
    // this.navigate("ArtistSignup", { imageData: data })();
    this.navigate("ArtistFormWrapper", { imageData: data })();
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    if (result.cancelled) {
      return;
    }
    this.props.navigation.state.params.onChoosePhoto(result.base64);
    // this.navigate("ArtistSignup", { imageData: result.base64 })();
    this.navigate("ArtistFormWrapper", { imageData: result.base64 })();
  };

  render() {
    const {
      hasCameraPermission,
      hasCameraRollPermission,
      flashMode,
      cameraType,
      capturing,
      captures
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    if (hasCameraRollPermission === null) {
      return <View />;
    } else if (hasCameraRollPermission === false) {
      return <Text>Access to camera roll has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={camera => (this.camera = camera)}
          />
          <TouchableOpacity onPress={this.pickImage}>
            <Text style={{ color: "white" }}>Choose from library</Text>
          </TouchableOpacity>
        </View>

        {captures.length > 0 && (
          <Gallery onPress={this.onGalleryChoice} captures={captures} />
        )}
        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginArtist: data => {
    dispatch(loginArtist(data));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(CameraScreen);
