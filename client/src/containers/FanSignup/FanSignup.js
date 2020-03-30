import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import Modal from "src/components/Modal";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import FormError from "src/components/FormError";
import continueButton from "src/images/buttons/continue_btn.png";

import { loginUser } from "src/store/actions/ActionCreator";
import { getUser } from "src/services/api";
import { saveStorage } from "src/services/LocalStorage";
import { capitalize } from "src/utils/General";

const FanSignup = ({ setShowModal, loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const hide = () => setShowModal(false);

  const onModalChange = func => val => {
    setErrorMessage(null);
    func(val);
  };

  const handleContinue = async () => {
    try {
      const res = await getUser({ email, password });
      if (res.success) {
        const user = res.data;
        setShowModal(false);
        loginUser(user);
        await saveStorage({ user });
      } else throw new Error(res.error);
    } catch (err) {
      console.log("ERR", err);
      setErrorMessage(err.message);
    }
  };

  return (
    <Modal dismiss={hide}>
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
      <TouchableOpacity style={styles.imageWrapper} onPress={handleContinue}>
        <Image style={styles.image} source={continueButton} />
      </TouchableOpacity>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(FanSignup);
