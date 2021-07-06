import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import styles from "./styles";

import createProfile from "src/images/buttons/continue_btn.png";
import DefaultContainer from "src/containers/DefaultContainer";
import ArtistForm from "./ArtistForm";
import {
  updateArtist,
  logout,
  loadingStatus,
  newArtist
} from "src/store/actions/ActionCreator";

import cloudinaryConfig, { upload as uploadImage } from "src/utils/Cloudinary";

const ArtistFormWrapper = ({
  navigation,
  navigateTo,
  user,
  artist,
  newArtist,
  updateArtist,
  logout,
  loadingStatus
}) => {
  const [types, setTypes] = useState({});
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
  }, [artist]);

  const updateProfile = () => {
    const hasRole = key => (artist.roles || []).indexOf(key) > -1;
    const roles = {
      vocals: hasRole("vocals"),
      piano: hasRole("piano"),
      guitar: hasRole("guitar"),
      bass: hasRole("bass"),
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

  const validate = creds => {
    const clone = { ...creds };
    delete clone._id;
    delete clone.imageURL;
    for (const k of Object.keys(clone)) {
      if (Array.isArray(clone[k]) && !clone[k].length) {
        return {
          valid: false,
          field: k,
          reason: `[${k}] must have at least one checked`
        };
      }
      if (!clone[k]) {
        return { valid: false, field: k, reason: `[${k}] cannot be empty` };
      }
    }
    return { valid: true };
  };

  const onSubmit = async () => {
    setErrorMessage("");
    const type = getType();
    const roles = getRoles();
    let imageURL = artist.imageURL || "";
    const artistData = {
      _id: artist._id,
      userId: user._id,
      name,
      genre,
      roles,
      type,
      imageURL
    };
    try {
      const validation = validate(artistData);
      if (!validation.valid) {
        throw new Error(validation.reason);
      }
      const res = await newArtist(artistData);
      if (res.error) {
        throw new Error(res.error);
      }
      navigateTo(res.data);
    } catch (err) {
      console.log("Error", err);
      // setErrorMessage(err.message);
      setErrorMessage(`Problem creating ${name || "Artist"}. ${err.message}`);
    }
  };

  const onChoosePhoto = async imageData => {
    loadingStatus(true);
    const imageURL = await uploadImage(imageData);
    loadingStatus(false);
    updateArtist({ _id: artist._id, imageURL });
  };

  const showCam = () => {
    navigation.navigate("CameraScreen", {
      onChoosePhoto
    });
  };

  return (
    <DefaultContainer navigation={navigation} bodyPaddingTop={20}>
      <ArtistForm
        handleChange={handleChange}
        handleRoleChange={handleRoleChange}
        handleChooseType={handleChooseType}
        onSubmit={onSubmit}
        genre={genre}
        id={artist._id}
        name={name}
        errorMessage={errorMessage}
        successMessage={successMessage}
        roles={roles}
        types={types}
        getType={getType}
        onPressCam={showCam}
        photo={artist.imageURL || cloudinaryConfig.userUrl}
      />
    </DefaultContainer>
  );
};

const mapStateToProps = state => ({
  user: state.login.user,
  artist: state.artist || {}
});

const mapDispatchToProps = dispatch => ({
  updateArtist: payload => dispatch(updateArtist(payload)),
  newArtist: payload => dispatch(newArtist(payload)),
  logout: () => dispatch(logout()),
  loadingStatus: status => dispatch(loadingStatus(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistFormWrapper);
