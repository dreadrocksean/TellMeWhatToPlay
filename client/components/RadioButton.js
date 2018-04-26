import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Check from '../images/icons/check_icon.png';

export default class AppText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      disabled: false,
    };
  }

  toggle() {
    this.setState({checked: !this.state.checked});
    (this.props.toggleCheckBox || (()=>{}))();
  }

  render() {
    const bg = this.state.checked ? 'white' : null;
    return (
      <TouchableOpacity
        style={[styles.container, {backgroundColor: bg}]}
        onPress={this.toggle.bind(this)}
      >
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'yellow',
    borderWidth: 3,
    borderRadius: 22,
    width: 22,
    height: 22,
    // position: 'relative',
    padding: 3,
  },
  image: {
    flex: 1,
    // alignItems: 'center',5
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});