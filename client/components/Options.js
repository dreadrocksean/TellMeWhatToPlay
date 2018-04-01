import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'unstated';
import {
  Dimensions, StyleSheet, Text, View, AsyncStorage, Image
} from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

import bg from '../images/musicbg.jpg';

const {height, width} = Dimensions.get('window');

export default class Options extends Component {

  static navigationOptions = {
    title: 'Options',
  };

  state = {};

  navigate(pageName) {
    const {navigate} = this.props.navigation;
    navigate(pageName, { name: pageName })
  }

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <Image source={bg}  style={styles.backgroundImage} />
          <RNButton style={styles.button}
            borderRadius={10}
            icon={{name: 'music', type: 'font-awesome'}}
            onPress={this.navigate.bind(this, 'ArtistList')}
            title={'Fan'}
            fontSize={48}
            buttonStyle={Object.assign({}, ...(styles.button), {backgroundColor: '#66cc66', height: 200})}
          />
          <RNButton
            borderRadius={10}
            icon={{name: 'music', type: 'font-awesome'}}
            onPress={this.navigate.bind(this, 'ArtistAdmin')}
            title={'Artist'}
            fontSize={48}
            buttonStyle={Object.assign({}, ...(styles.button), {backgroundColor: '#8888ff', height: 200})}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 5,
  },
  button: {
    // flex: 1,
    height: 200,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // resizeMode: 'cover',
  },
});
