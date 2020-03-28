import React, { useState, useRef, memo } from "react";
import {
  ViewPropTypes,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

import icon from "src/images/icons/eyeslash_icon1.png";

const AppTextInput = ({
  onChangeText,
  value,
  formattedValue = {},
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  editable = true,
  autoCapitalize,
  style
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [visibleText, setVisibleText] = useState("");

  const keyPressedRef = useRef("");

  const togglePassword = () => setShowPassword(!showPassword);

  // Allow for backspace, otherwise it keeps adding on.
  const processVisible = (visibleText, allText) => {
    if (keyPressedRef.current === "Backspace") {
      return visibleText.slice(0, -1);
    }
    return `${visibleText}${allText.substr(-1)}`;
  };

  const handleOnChangeText = text => {
    const str =
      !!formattedValue.visible && text.length
        ? processVisible(formattedValue.visible, text)
        : text;
    onChangeText(str);
  };

  const onKeyPress = evt => (keyPressedRef.current = evt.nativeEvent.key);

  console.log("RENDER APPTEXTINPUT");

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || "rgba(255,255,255,0.3)"}
        onChangeText={handleOnChangeText}
        onKeyPress={onKeyPress}
        secureTextEntry={secureTextEntry && !showPassword}
        editable={editable}
        autoCapitalize={autoCapitalize || "none"}
      >
        {!!formattedValue.visible ? (
          <Text style={styles.formattedWrapper}>
            <Text style={[styles.formattedText, styles.invisible]}>
              {formattedValue.invisible}
            </Text>
            <Text style={styles.formattedText}>{formattedValue.visible}</Text>
          </Text>
        ) : (
          <Text style={styles.input}>{value}</Text>
        )}
      </TextInput>
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePassword}>
          <Image resizeMode="contain" style={styles.inputIcon} source={icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

AppTextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleOnChangeText: PropTypes.func,
  value: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  editable: PropTypes.bool
};

export default memo(AppTextInput);
