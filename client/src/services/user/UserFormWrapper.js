import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import {
  createUser,
  createDoc,
  getDocs,
  getUser,
  fetchUser,
  createArtist,
  fetchUserArtist
} from "src/services/api";
import {
  loginUser as loginUserType,
  loginArtist as loginArtistType,
  logout as logoutType
} from "src/store/actions/ActionCreator";
import { saveStorage } from "src/services/LocalStorage";
import UserForm from "./UserForm";
import AppModal from "src/components/Modal";
import AppText from "src/components/AppText";

import successIcon from "src/images/icons/success_icon.png";
import continueButton from "src/images/buttons/continue_btn.png";

const UserFormWrapper = ({
  navigation,
  loginUser,
  loginArtist,
  logout,
  userType,
  user,
  artist,
  navigateTo
}) => {
  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState("adrian@bartholomusic.com");
  const [password, setPassword] = useState("1234");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [zip, setZip] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [submitType, setSubmitType] = useState(null);

  const resetErrorMessage = () => setErrorMessage("");

  const handleChange = field => val => {
    switch (field) {
      case "email": {
        return setEmail(val);
      }
      case "password": {
        return setPassword(val);
      }
      case "fname": {
        return setFname(val);
      }
      case "lname": {
        return setLname(val);
      }
      case "zip": {
        return setZip(val);
      }
    }
  };

  const onHasAccountChange = hasAccount => () => setHasAccount(hasAccount);

  const togglePassword = () => setHidePassword(!this.state.hidePassword);

  const onSubmit = type => async () => {
    const credentials = { email, password, fname, lname, zip };
    let user, artist, errorMessage, successMessage, submitType;
    try {
      if (!credentials.email.trim() || !credentials.password.trim()) {
        throw "Fields cannot be empty";
      }
      if (type === "SignUp") {
        await createDoc("user", credentials);
        successMessage = "Your Account Was Successfully Created";
      } else if (type === "LogIn") {
        const res = await loginUser(credentials);
        console.log("UserFormWrapper loginUser RES", res);
        successMessage = res.message;
      }

      setSuccessMessage(successMessage);
      console.log("SUCCESSMESSAGE", successMessage);
      setErrorMessage(null);
      setShowModal(true);
      setSubmitType(type);
    } catch (err) {
      // console.log("error:", err);
      setSuccessMessage(null);
      setErrorMessage(err);
    }
  };

  const handleContinue = async () => {
    if (userType === "ARTIST" && user && submitType === "LogIn") {
      try {
        const res = await getDocs("artist", { userId: user._id });
        navigateTo();
        return;
        console.log("handleContinue1 NAVIGATETO", navigateTo);
        const artist = res.data;
        console.log("handleContinue2 NAVIGATETO", navigateTo);
        loginArtist(artist);
        console.log("handleContinue3 NAVIGATETO", navigateTo);
        await saveStorage({ artist });
        console.log("handleContinue4 NAVIGATETO", navigateTo);
        navigateTo(artist);
      } catch (err) {
        console.log("ERR", err);
        navigateTo();
      }
    }
  };

  const dismissModal = () => {
    setShowModal(false);
    navigation.replace("Options");
  };

  const fieldValues = { email, password, fname, lname, zip };
  return successMessage && showModal ? (
    <AppModal dismiss={dismissModal}>
      <View style={{ width: "45%", flex: 1 }}>
        <Image style={[styles.image]} source={successIcon} />
      </View>
      <AppText textStyle={{ fontWeight: "normal", fontSize: 18 }}>
        {successMessage}
      </AppText>
      <TouchableOpacity style={styles.imageWrapper} onPress={handleContinue}>
        <Image style={styles.image} source={continueButton} />
      </TouchableOpacity>
    </AppModal>
  ) : (
    <UserForm
      hasAccount={hasAccount}
      onHasAccountChange={onHasAccountChange}
      handleChange={handleChange}
      onSubmit={onSubmit}
      fieldValues={fieldValues}
      errorMessage={errorMessage}
      togglePassword={togglePassword}
      hidePassword={hidePassword}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUserType(payload)),
  loginArtist: payload => dispatch(loginArtistType(payload)),
  logout: payload => dispatch(logoutType())
});

const mapStateToProps = state => ({
  userType: state.login.userType,
  artist: state.login.artist,
  user: state.login.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFormWrapper);
