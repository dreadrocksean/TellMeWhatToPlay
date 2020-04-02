import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./styles";
import AppText from "src/components/AppText";
import AppTextInput from "src/components/AppTextInput";
import signupButton from "src/images/buttons/signup_btn.png";
import loginButton from "src/images/buttons/login_btn.png";
import eyeslashIcon from "src/images/icons/eyeslash_icon1.png";

const UserForm = ({
  hasAccount,
  onHasAccountChange,
  handleChange,
  fieldValues,
  onSubmit,
  errorMessage,
  togglePassword,
  hidePassword
}) => {
  const [extraScrollHeight, setExtraScrollHeight] = useState(0);
  const { email, password, fname, lname, zip } = fieldValues;
  const fields = [
    {
      placeholder: "Email",
      value: email,
      onChange: handleChange("email")
    },
    {
      placeholder: "Password",
      value: password,
      icon: eyeslashIcon,
      onChange: handleChange("password"),
      hidePassword
    },
    {
      placeholder: "First Name",
      value: fname,
      onChange: handleChange("fname")
    },
    {
      placeholder: "Last Name",
      value: lname,
      onChange: handleChange("lname")
    },
    {
      placeholder: "Zip Code",
      value: zip,
      onChange: handleChange("zip")
    }
  ];

  const handleOnFocus = index => () => {
    setExtraScrollHeight(index * 10 - 100);
  };

  return (
    <View>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          extraScrollHeight={extraScrollHeight}
          style={styles.form}
        >
          {fields
            .filter(
              f =>
                f.placeholder === "Email" ||
                f.placeholder === "Password" ||
                !hasAccount
            )
            .map((field, i) => (
              <AppTextInput
                key={i}
                onFocus={handleOnFocus(i)}
                style={styles.input}
                placeholder={field.placeholder}
                onChangeText={field.onChange}
                value={field.value}
                secureTextEntry={field.placeholder === "Password"}
              />
            ))}
          <View>
            <TouchableOpacity
              onPress={onSubmit(hasAccount ? "LogIn" : "SignUp")}
              style={styles.submitButton}
            >
              <Image source={hasAccount ? loginButton : signupButton} />
            </TouchableOpacity>
            <AppText style={styles.label} textStyle={styles.labelText}>
              {hasAccount ? "DON'T" : "ALREADY"} HAVE AN ACCOUNT?
            </AppText>
            <TouchableOpacity onPress={onHasAccountChange(!hasAccount)}>
              <AppText>{hasAccount ? "SIGNUP" : "LOG IN"}</AppText>
            </TouchableOpacity>
          </View>
          <AppText textStyle={styles.error}>{errorMessage}</AppText>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default UserForm;
