import React, { Component } from "react";
import {
  ViewPropTypes,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

import icon from "src/images/icons/eyeslash_icon1.png";

export default class AppTextInput extends Component {
  static defaultProps = {
    editable: true
  };

  state = {
    showPassword: false,
    visibleText: ""
  };

  keyPressed = "";

  togglePassword = () =>
    this.setState({
      showPassword: !this.state.showPassword
    });

  // Allow for backspace, otherwise it keeps adding on.
  processVisible = (visibleText, allText) => {
    if (this.keyPressed === "Backspace") {
      return visibleText.slice(0, -1);
    }
    return `${visibleText}${allText.substr(-1)}`;
  };

  handleOnChangeText = text => {
    const str =
      this.props.formattedValue && text.length
        ? this.processVisible(this.props.formattedValue.visible, text)
        : text;
    this.props.onChangeText(str);
  };

  onKeyPress = evt => (this.keyPressed = evt.nativeEvent.key);

  render() {
    const {
      value,
      formattedValue,
      placeholder,
      placeholderTextColor,
      secureTextEntry,
      editable,
      autoCapitalize,
      style
    } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || "rgba(255,255,255,0.3)"}
          onChangeText={this.handleOnChangeText}
          onKeyPress={this.onKeyPress}
          secureTextEntry={secureTextEntry && !this.state.showPassword}
          editable={editable}
          autoCapitalize={autoCapitalize || "none"}
        >
          {formattedValue ? (
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
          <TouchableOpacity onPress={this.togglePassword}>
            <Image
              resizeMode="contain"
              style={styles.inputIcon}
              source={icon}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "montserrat-bold",
    color: "rgba(220,220,255,0.9)",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  container: {
    flexDirection: "row"
  },
  input: {
    color: "white",
    // flex: 1,
    width: "100%",
    fontSize: 20,
    padding: 5,
    paddingLeft: 15,
    height: 60,
    borderColor: "#7a42f4",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 15
  },
  inputIcon: {
    width: 25,
    height: 60,
    position: "absolute",
    right: 15,
    opacity: 0.5
    // backgroundColor: 'grey',
  },
  formattedWrapper: {
    flexDirection: "row",
    height: 60,
    flex: 1,
    padding: 5,
    paddingLeft: 15,
    borderColor: "#7a42f4",
    borderWidth: 1,
    borderRadius: 15
  },
  formattedText: {
    fontWeight: "100",
    fontFamily: "montserrat-regular",
    color: "rgba(220,220,255,0.9)",
    fontSize: 20
    // textAlign: "center"
  },
  invisible: {
    opacity: 0
  }
});

AppTextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleOnChangeText: PropTypes.func,
  value: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  editable: PropTypes.bool
};
