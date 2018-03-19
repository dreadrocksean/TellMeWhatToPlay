import React from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';

const SongForm = props => (
  <View style={{flexDirection: 'row'}}>
    <View style={{flex: 4}}>
      <TextInput
        style={styles.autocomplete}
        placeholder={props.titleComplete || ''}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder='Title'
        onChangeText={title => props.handleChange({title})}
      />
    </View>
    <View style={{flex: 4}}>
      <TextInput
        style={styles.autocomplete}
        placeholder={props.artistComplete || ''}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder={ props.artistComplete ? '' : 'Artist' }
        onChangeText={author => props.handleChange({author})}
      />
    </View>
    <TouchableOpacity
      style = {styles.submitButton}
      onPress = { () => props.onSubmit() }>
      <Text style = {styles.submitButtonText}> {props.command} </Text>
    </TouchableOpacity>
  </View>
);

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

export default SongForm;

