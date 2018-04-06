import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, } from 'react-native';

import UserForm from './UserForm';
import ArtistForm from './ArtistForm';

class FormWrapper extends Component {

	constructor(props) {
		super(props);
	}

  renderUserForm() {
    return (
      <UserForm
        handleChange={this.handleChange.bind(this)}
        onSubmit={this.onSubmitUser.bind(this)}
        edit_email={this.state.edit_email}
        edit_password={this.state.edit_password}
        errorMessage={this.state.errorMessage}
      />
    )
  }

  renderArtistForm() {
    return (
      <ArtistForm
        handleChange={this.handleChange.bind(this)}
        onSubmit={this.createArtist.bind(this)}
        edit_name={this.state.edit_email}
        name={this.state.name}
        command={'Add Me'}
        errorMessage={this.state.errorMessage}
      />
    )
  }

  renderContent () {
    const { authorized, artist } = this.state;
    return (
      <View style={styles.content}>
        {!authorized && this.renderUserForm()}
        {authorized && !artist && this.renderArtistForm()}
        {this.renderButton(
          'Cancel',
          () => {
            // this.props.navigation.goBack();
            this.setState({
              showModal: false,
              authorized: false,
            })
          }
        )}
      </View>
    )
  }

  render() {
  	return this.renderContent();
  }
}

const styles StyleSheet.create({
	content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});