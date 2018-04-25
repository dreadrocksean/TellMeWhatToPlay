import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import DefaultContainer from './DefaultContainer';
import { updateHeader } from '../utils/UpdateHeader';

class Lyrics extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerStyle = Object.assign({},
      params.bg ? {backgroundColor: params.bg} : null
    );
    return {
      title: `${params.title || params.screen || 'Lyrics'}`,
      headerTitleStyle : {textAlign: 'center', alignSelf:'center'},
      headerStyle,
    };
  };


  state = {}

  componentWillReceiveProps(nextProps) {
    updateHeader(nextProps);
  }

  render() {
    return (
      <DefaultContainer
        loading={this.state.loading}
        goHome={() => this.props.navigation.navigate('Options')}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.text}>{this.props.navigation.state.params.lyrics}</Text>
          </View>
        </ScrollView>
      </DefaultContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: "#d4d4d4",
  }
});

export default Lyrics;

