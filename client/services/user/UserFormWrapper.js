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
} from "../api";
import {
  loginUser,
  loginArtist,
  logout
} from "../../redux/actions/ActionCreator";
import { saveStorage } from "../LocalStorage";
import UserForm from "./UserForm";
import AppModal from "../../components/Modal";
import AppText from "../../components/AppText";

import successIcon from "../../images/icons/success_icon.png";
import continueButton from "../../images/buttons/continue_btn.png";

class UserFormWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccount: false,
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
    this.dismissModal = this.dismissModal.bind(this);
  }

  async componentDidUpdate() {}

  resetErrorMessage = () => this.setState({ errorMessage: "" });

  handleChange = field => {
    // const key = Object.keys(field)[0];
    // this.setState({[key]: field[key]});
    this.setState(field);
  };

  onHasAccountChange = hasAccount => this.setState({ hasAccount });

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
        const response = await createDoc("user", credentials);
        user = response.data;
        successMessage = "Your Account Was Successfully Created";
        errorMessage = null;
        submitType = type;
      } else if (type === "LogIn") {
        const response = await getUser(credentials);
        if (response.success) {
          successMessage = "You Were Successfully Logged In";
          errorMessage = null;
          submitType = type;
        } else {
          throw response.error;
        }
        user = response.data;
      }

      await saveStorage({ user });
      // console.log('onSubmit this.props', this.props);
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
    console.log("this.props", this.props);
    const { userType, user, navigateTo } = this.props;
    console.log("continue", userType, user, navigateTo, this.state.submitType);
    if (userType === "ARTIST" && user && this.state.submitType === "LogIn") {
      const response = await getDocs("artist", { userId: user._id });
      const artist = response.data;
      this.props.loginArtist(artist);
      saveStorage({ artist });
    }
    navigateTo();
  };

  dismissModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    console.log("render state", this.state);
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

const mapStateToProps = state => {
  return {
    userType: state.login.userType,
    artist: state.login.artist,
    user: state.login.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFormWrapper);
