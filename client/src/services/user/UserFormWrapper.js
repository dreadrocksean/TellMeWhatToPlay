import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import DefaultContainer from "src/containers/DefaultContainer";
import {
  loginUser,
  signupUser,
  loginArtist,
  guestTypeArtist,
  guestTypeFan
} from "src/store/actions/ActionCreator";
import UserForm from "./UserForm";
import AppModal from "src/components/Modal";
import AppText from "src/components/AppText";

const UserFormWrapper = ({
  loginUser,
  signupUser,
  loginArtist,
  guestTypeArtist,
  guestTypeFan,
  userType,
  navigateTo
}) => {
  const [hasAccount, setHasAccount] = useState(true);
  // const [email, setEmail] = useState("");
  // const [email, setEmail] = useState("landon@bartholomusic.com");
  const [email, setEmail] = useState("adrian@bartholomusic.com");
  // const [password, setPassword] = useState("");
  const [password, setPassword] = useState("1234");
  // const [password, setPassword] = useState("Skateurban04");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [zip, setZip] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const resetErrorMessage = () => setErrorMessage("");
  const renderHeaderMiddle = () => (
    <AppText textStyle={styles.text}>ACCOUNT</AppText>
  );

  const handleChange = field => val => {
    switch (field) {
      case "email":
        setEmail(val); break;
      case "password":
        setPassword(val); break;
      case "fname":
        setFname(val); break;
      case "lname":
        setLname(val); break;
      case "zip":
        setZip(val); break;
    }
  };

  const onHasAccountChange = hasAccount => () => setHasAccount(hasAccount);
  const togglePassword = () => setHidePassword(!this.state.hidePassword);

  const onSubmit = type => async () => {
    const credentials = { email, password, fname, lname, zip };
    setErrorMessage(null);
    try {
      if (!credentials.email.trim() || !credentials.password.trim()) {
        throw "Fields cannot be empty";
      }
      if (type === "SignUp") {
        const user = await signupUser(credentials);
        navigateTo(user.data);
        console.log("USER", user);
      } else if (type === "LogIn") {
        const userRes = await loginUser(credentials);
        const artistRes = await loginArtist(userRes.data._id);
        navigateTo(userRes.data, artistRes.data);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <DefaultContainer style={styles.body} headerMiddle={renderHeaderMiddle()}>
      <UserForm
        hasAccount={hasAccount}
        onHasAccountChange={onHasAccountChange}
        handleChange={handleChange}
        onSubmit={onSubmit}
        fieldValues={{ email, password, fname, lname, zip }}
        errorMessage={errorMessage}
        togglePassword={togglePassword}
        hidePassword={hidePassword}
      />
    </DefaultContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload)),
  signupUser: payload => dispatch(signupUser(payload)),
  loginArtist: payload => dispatch(loginArtist(payload)),
  guestTypeArtist: () => dispatch(guestTypeArtist()),
  guestTypeFan: () => dispatch(guestTypeFan())
});

const mapStateToProps = state => ({
  userType: state.login.userType,
  artist: state.artist
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFormWrapper);
