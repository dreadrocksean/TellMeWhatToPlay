import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

class Lyrics extends Component {

  static navigationOptions = {
    title: 'Lyrics',
  };
  state = {}

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.navigation.state.params.lyrics}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: "#888",
  }
});

export default Lyrics;

