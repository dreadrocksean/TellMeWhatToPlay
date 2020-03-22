import React, { Component } from "react";
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
  loginUser,
  loginArtist,
  logout
} from "src/store/actions/ActionCreator";
import { saveStorage } from "src/services/LocalStorage";
import UserForm from "./UserForm";
import AppModal from "src/components/Modal";
import AppText from "src/components/AppText";

import successIcon from "src/images/icons/success_icon.png";
import continueButton from "src/images/buttons/continue_btn.png";

class UserFormWrapper extends Component {
  state = {
    hasAccount: true,
    email: "",
    password: "",
    fname: "",
    lname: "",
    zip: "",
    successMessage: null,
    errorMessage: null,
    hidePassword: true,
    submitType: null
  };

  resetErrorMessage = () => this.setState({ errorMessage: "" });

  handleChange = field => this.setState(field);

  onHasAccountChange = hasAccount => () => this.setState({ hasAccount });

  togglePassword = () =>
    this.setState({ hidePassword: !this.state.hidePassword });

  onSubmit = type => async () => {
    // console.log('onsubmit props', this.props);
    const { email, password, fname, lname, zip } = this.state;
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
      this.props.loginUser(user);
      this.setState({
        successMessage,
        errorMessage,
        submitType: type
      });
    } catch (err) {
      console.log("error:", err);
      this.setState({
        successMessage: null,
        errorMessage: err
      });
      this.props.logout();
      await saveStorage({ user: null });
    }
  };

  continue = async () => {
    const { userType, user, navigateTo } = this.props;

    if (userType === "ARTIST" && user && this.state.submitType === "LogIn") {
      try {
        const res = await getDocs("artist", { userId: user._id });
        const artist = res.data;
        this.props.loginArtist(artist);
        await saveStorage({ artist });
        navigateTo(artist);
      } catch (err) {}
    }
  };

  dismissModal = () =>
    this.setState({
      showModal: false
    });

  render() {
    const {
      email,
      password,
      fname,
      lname,
      zip,
      successMessage,
      errorMessage
    } = this.state;
    const fieldValues = { email, password, fname, lname, zip };
    return successMessage ? (
      <AppModal dismiss={this.dismissModal}>
        <View style={{ width: "45%", flex: 1 }}>
          <Image style={[styles.image]} source={successIcon} />
        </View>
        <AppText textStyle={{ fontWeight: "normal", fontSize: 18 }}>
          {successMessage}
        </AppText>
        <TouchableOpacity
          style={{ alignSelf: "stretch", flex: 1 }}
          onPress={this.continue}
        >
          <Image style={styles.image} source={continueButton} />
        </TouchableOpacity>
      </AppModal>
    ) : (
      <UserForm
        hasAccount={this.state.hasAccount}
        onHasAccountChange={this.onHasAccountChange}
        handleChange={this.handleChange}
        onSubmit={this.onSubmit}
        fieldValues={fieldValues}
        errorMessage={this.state.errorMessage}
        togglePassword={this.togglePassword}
        hidePassword={this.state.hidePassword}
      />
    );
  }
}

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
  loginUser: payload => dispatch(loginUser(payload)),
  loginArtist: payload => dispatch(loginArtist(payload)),
  logout: payload => dispatch(logout())
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
