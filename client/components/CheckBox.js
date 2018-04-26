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
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.toggle.bind(this)}
      >
        {this.state.checked && (
          <Image style={styles.image} source={Check} />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    width: 25,
    height: 25,
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