import React, { useState, useRef, memo } from "react";
import {
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
  onFocus,
  value,
  formattedValue = {},
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  editable = true,
  autoCapitalize,
  style,
  textStyle
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

  // console.log("APPTEXTINPUT: ", value);

  return (
    <View style={{ ...styles.root, ...style }}>
      <TextInput
        style={{ ...styles.input, ...textStyle }}
        onChangeText={handleOnChangeText}
        editable={editable}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || "rgba(255,255,255,0.3)"}
        onKeyPress={onKeyPress}
        secureTextEntry={secureTextEntry && !showPassword}
        autoCapitalize={autoCapitalize || "none"}
      >
        {!!formattedValue.visible ? (
          <Text style={styles.formattedWrapper}>
            <Text style={{ ...styles.formattedText, ...styles.invisible }}>
              {formattedValue.invisible}
            </Text>
            <Text style={styles.formattedText}>{formattedValue.visible}</Text>
          </Text>
        ) : (
          <Text style={styles.input}>{value}</Text>
        )}
      </TextInput>
      {secureTextEntry && (
        <TouchableOpacity style={styles.inputIcon} onPress={togglePassword}>
          <Image resizeMode="contain" style={styles.image} source={icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

AppTextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  value: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  editable: PropTypes.bool,


  formattedValue: PropTypes.object,
  placeholderTextColor: PropTypes.string,
  autoCapitalize: PropTypes.bool,
  style: PropTypes.object,
  textStyle: PropTypes.object,
};

export default memo(AppTextInput);
