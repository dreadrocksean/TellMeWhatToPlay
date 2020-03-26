import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import createProfile from "src/images/buttons/continue_btn.png";
import DefaultContainer from "src/containers/DefaultContainer";
import ArtistForm from "./ArtistForm";
import {
  loginArtist as loginArtistType,
  logout as logoutType,
  loadingStatus as loadingStatusType
} from "src/store/actions/ActionCreator";

import { createDoc, updateDoc, getDataFromRef } from "src/services/api";
import cloudinaryConfig, { upload } from "src/utils/Cloudinary";

const ArtistFormWrapper = ({
  navigation,
  user,
  artist = {},
  loading,
  loginArtist,
  logout,
  loadingStatus
}) => {
  const [types, setTypes] = useState({});
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [artistNameComplete, setArtistNameComplete] = useState("");
  const [artistImageURL, setArtistImageURL] = useState("");
  const [genre, setGenre] = useState(null);
  const [roles, setRoles] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    updateProfile();
  }, []);

  const updateProfile = () => {
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
    };
    setTypes(types);
    setId(artist._id);
    setName(artist.name);
    setGenre(artist.genre);
    setRoles(roles);
    setPhoto(artist.imageURL);
  };

  const resetErrorMessage = () => setErrorMessage("");

  const handleChange = fieldName => val => {
    switch (fieldName) {
      case "name": {
        setName(val);
        break;
      }
      case "genre": {
        setGenre(val);
        break;
      }
    }
  };

  const handleChooseType = fieldName => {
    const typeKeys = Object.keys(types);
    const newTypes = typeKeys.reduce((obj, k) => {
      obj[k] = k === fieldName;
      return obj;
    }, {});
    setTypes(newTypes);
  };

  const handleRoleChange = fieldName => {
    const newRoles = {
      ...roles,
      [fieldName]: !roles[fieldName]
    };
    setRoles(newRoles);
  };

  const getType = () => Object.keys(types).filter(k => types[k])[0];

  const getRoles = () => {
    return Object.keys(roles).filter(k => roles[k]);
  };

  const onSubmit = async () => {
    const type = getType();
    const roles = getRoles();
    let imageURL = artist.imageURL || "";
    const artistData = {
      userId: user._id,
      name,
      genre,
      roles,
      type,
      imageURL
    };

    try {
      const response = id
        ? await updateDoc("artist", { _id: id, ...artistData })
        : await createDoc("artist", artistData);
      if (response.error) {
        console.log("RESPONSE.ERROR", response.error);
        throw new Error(`Problem creating ${name}: ${response.error} `);
      }
      const artist = response.data;
      loginArtist(artist);
      setSuccessMessage(`Successfully created ${name}!`);
      navigate("ArtistAdmin")();
    } catch (e) {
      setErrorMessage(`Problem creating ${name}`);
    }
  };

  const onChoosePhoto = async imageData => {
    loadingStatus(true);
    const imageURL = await upload(imageData);
    loadingStatus(false);
    loginArtist({ imageURL });
  };

  const showCam = () => {
    navigation.navigate("CameraScreen", {
      onChoosePhoto: this.onChoosePhoto
    });
  };

  const navigate = pageName => () => {
    navigation.navigate(pageName, {
      name: pageName,
      artist: artist
    });
  };

  const handleLogout = () => this.navigate("Options")();

  return (
    <DefaultContainer loading={loading} navigation={navigation}>
      <ArtistForm
        handleChange={handleChange}
        handleRoleChange={handleRoleChange}
        handleChooseType={handleChooseType}
        onSubmit={onSubmit}
        genre={genre}
        id={id}
        name={name}
        errorMessage={errorMessage}
        successMessage={successMessage}
        roles={roles}
        types={types}
        getType={getType}
        onPressCam={showCam}
        photo={artist.imageURL || cloudinaryConfig.userUrl}
      />
      {/*<TouchableOpacity style={styles.cancel}>
          <Image source={createProfile} style={styles.image} />
        </TouchableOpacity>*/}
    </DefaultContainer>
  );
};

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
  },
  cancel: {
    // opacity: 0,
    alignSelf: "center",
    width: "50%"
    // marginBottom: 60
  },
  image: {
    width: undefined,
    resizeMode: "contain"
  }
});

const mapStateToProps = state => ({
  user: state.login.user,
  artist: state.login.artist,
  loading: state.app.loading
});

const mapDispatchToProps = dispatch => ({
  loginArtist: payload => dispatch(loginArtistType(payload)),
  logout: () => dispatch(logoutType()),
  loadingStatus: status => dispatch(loadingStatusType(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistFormWrapper);
