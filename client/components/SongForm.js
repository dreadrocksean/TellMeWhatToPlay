import React from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';

const SongForm = props => (
  <View style={{flexDirection: 'row'}}>
    <TextInput
      style={styles.input}
      placeholder='Title'
      onChangeText={title => props.handleChange({title})}
      value={props.title}
    />
    <TextInput
      style={styles.input}
      placeholder='Author'
      onChangeText={author => props.handleChange({author})}
      value={props.author}
    />
    <TouchableOpacity
      style = {styles.submitButton}
      onPress = { () => props.onSubmit() }>
      <Text style = {styles.submitButtonText}> {props.command} </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    padding: 5,
    flex: 3,
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

