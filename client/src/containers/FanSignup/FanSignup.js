import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { View, Image, TouchableOpacity } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import styles from "./styles";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import FormError from "src/components/FormError";
import continueButton from "src/images/buttons/continue_btn.png";
import signupButton from "src/images/buttons/signup_button.png";

import {
  loginUser,
  signupUser,
  setModalContent
} from "src/store/actions/ActionCreator";
import { getUser } from "src/services/api";
import { saveStorage } from "src/services/LocalStorage";
import { capitalize } from "src/utils/General";

const FanSignup = ({ setModalContent, loginUser, signupUser }) => {
  const [email, setEmail] = useState("a@a.a");
  const [password, setPassword] = useState("1111");
  const [errorMessage, setErrorMessage] = useState(null);

  const hide = () => setModalContent(null);

  const onModalChange = func => val => {
    setErrorMessage(null);
    func(val);
  };

  const handleSignup = async () => {
    try {
      const res = await signupUser({ email, password });
      if (res.success) {
        hide();
      } else throw new Error(res.error);
    } catch (err) {
      console.log("ERR", err);
      setErrorMessage(err.message);
    }
  };

  const handleContinue = async () => {
    try {
      const res = await loginUser({ email, password });
      if (res.success) {
        hide();
      } else throw new Error(res.error);
    } catch (err) {
      console.log("ERR", err);
      setErrorMessage(err.message);
    }
  };

  return (
    <Fragment>
      <View style={styles.children}>
        <AppText
          style={styles.child}
          numberOfLines={2}
          textStyle={{ fontFamily: "montserrat-regular" }}
        >
          LOG IN OR CREATE AN ACCOUNT
        </AppText>
        {errorMessage && (
          <FormError style={styles.child}>{errorMessage}</FormError>
        )}
        <AppTextInput
          style={styles.child}
          placeholder="Email"
          onChangeText={onModalChange(setEmail)}
          value={email}
        />
        <AppTextInput
          style={styles.child}
          placeholder="Password"
          onChangeText={onModalChange(setPassword)}
          value={password}
          secureTextEntry={true}
        />
      </View>
      {!errorMessage ? (
        <TouchableOpacity style={styles.imageWrapper} onPress={handleContinue}>
          <Image style={styles.image} source={continueButton} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.imageWrapper} onPress={handleSignup}>
          <Image style={styles.image} source={signupButton} />
        </TouchableOpacity>
      )}
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload)),
  signupUser: payload => dispatch(signupUser(payload)),
  setModalContent: payload => dispatch(setModalContent(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(FanSignup);
