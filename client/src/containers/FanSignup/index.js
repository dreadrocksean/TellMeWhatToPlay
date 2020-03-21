import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from "react-native";

import styles from "./styles";
import Modal from "src/components/Modal";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import FormError from "src/components/FormError";
import continueButton from "src/images/buttons/continue_btn.png";

import { loginUser } from "src/store/actions/ActionCreator";
import { getUser } from "src/services/api";
import { saveStorage } from "src/services/LocalStorage";

const { width, height } = Dimensions.get("window");

class FanSignup extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null
  };

  hide = () => this.props.setShowModal(false);

  onModalChange = (field, value) => {
    this.setState({
      [field]: value,
      errorMessage: null
    });
  };

  continue = async () => {
    const { email, password } = this.state;
    const response = await getUser({ email, password });
    if (response.success) {
      const user = response.data;
      this.props.setShowModal(false);
      this.props.loginUser(user);
      await saveStorage({ user });
    } else {
      this.setState({ errorMessage: response.error });
    }
  };

  render() {
    const { errorMessage, email, password } = this.state;
    return this.props.showModal ? (
      <Modal dismiss={this.hide}>
        <AppText
          style={{ flex: 1 }}
          textStyle={{ fontFamily: "montserrat-regular" }}
        >
          LOG IN OR CREATE AN ACCOUNT
        </AppText>
        {errorMessage && <FormError>{errorMessage}</FormError>}
        <AppTextInput
          style={{ flex: 1 }}
          placeholder="Email"
          onChangeText={val => this.onModalChange.call(this, "email", val)}
          value={email}
        />
        <AppTextInput
          style={{ flex: 1 }}
          placeholder="Password"
          onChangeText={val => this.onModalChange.call(this, "password", val)}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.imageWrapper} onPress={this.continue}>
          <Image style={styles.image} source={continueButton} />
        </TouchableOpacity>
      </Modal>
    ) : null;
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(FanSignup);
