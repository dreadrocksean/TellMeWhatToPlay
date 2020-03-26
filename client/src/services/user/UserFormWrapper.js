import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        const res = await createDoc("user", credentials);
        user = res.data;
        successMessage = "Your Account Was Successfully Created";
        errorMessage = null;
        submitType = type;
      } else if (type === "LogIn") {
        const res = await getUser(credentials);
        if (res.success) {
          successMessage = "You Were Successfully Logged In";
          errorMessage = null;
          submitType = type;
        } else {
          throw res.error;
        }
        user = res.data;
      }

      // await saveStorage({ user });
      loginUser(user);
      setSuccessMessage(successMessage);
      setErrorMessage(errorMessage);
      setShowModal(true);
      setSubmitType(type);
    } catch (err) {
      console.log("error:", err);
      setSuccessMessage(null);
      setErrorMessage(err);
      logout();
      await saveStorage({ user: null });
    }
  };

  const handleContinue = async () => {
    if (userType === "ARTIST" && user && submitType === "LogIn") {
      try {
        const res = await getDocs("artist", { userId: user._id });
        const artist = res.data;
        loginArtist(artist);
        await saveStorage({ artist });
        navigateTo(artist);
      } catch (err) {}
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
      <TouchableOpacity
        style={{ alignSelf: "stretch", flex: 1 }}
        onPress={handleContinue}
      >
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

const styles = StyleSheet.create({
  modalContent: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain"
  }
});

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
