import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';

class ArtistForm extends Component {

  state = {
    artistName: '',
    genres: [],
  }

  handleChange(field) {
    console.log(field)
    this.setState(field);
    this.props.handleChange(field);
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 4}}>
          <TextInput
            style={styles.autocomplete}
            placeholder={this.props.artistNameComplete || ''}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder='Artist Name'
            onChangeText={artistName => this.handleChange({artistName})}
            value={this.props.artistName || this.state.artistName}
          />
        </View>
        <TouchableOpacity
          style = {styles.submitButton}
          onPress = { () => this.props.onSubmit() }>
          <Text style = {styles.submitButtonText}> {this.props.command} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  autocomplete: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    fontSize: 20,
    padding: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  input: {
    position: 'relative',
    fontSize: 20,
    padding: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#7a42f4',
    padding: 10,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  }
});

export default ArtistForm;

