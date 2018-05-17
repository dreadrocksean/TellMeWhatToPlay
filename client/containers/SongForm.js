import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';

class SongForm extends Component {

  state = {
    title: '',
    artist: '',
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
            placeholder={this.props.titleComplete || ''}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder='Title'
            onChangeText={title => this.handleChange({title})}
            value={this.props.title || this.state.title}
          />
        </View>
        <View style={{flex: 4}}>
          <TextInput
            style={styles.autocomplete}
            placeholder={this.props.artistComplete || ''}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder={ this.props.artistComplete ? '' : 'Artist' }
            onChangeText={artist => this.handleChange({artist})}
            value={this.props.author || this.state.artist}
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
    borderWidth: 1,
    color: 'white',
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

export default SongForm;

