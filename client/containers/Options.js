import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
// import { Provider } from 'unstated';

import { guestTypeArtist, guestTypeFan } from '../redux/actions/ActionCreator';
import {
  Dimensions, StyleSheet, Text, View, AsyncStorage, Image
} from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

import bg from '../images/musicbg.jpg';

const {height, width} = Dimensions.get('window');

class Options extends Component {

  static navigationOptions = {
    title: 'Options',
  };

  state = {};

  navigate(pageName) {
    const {navigate} = this.props.navigation;
    const action = pageName === 'ArtistAdmin'
      ? guestTypeArtist() : guestTypeFan();
    this.props.dispatch(action);
    navigate(pageName, { name: pageName })
  }

  render() {
    // console.log('props', this.props);
    return (
        <View style={styles.container}>
          <Image source={bg}  style={styles.backgroundImage} />
          <RNButton style={styles.button}
            borderRadius={200}
            onPress={this.navigate.bind(this, 'ArtistList')}
            title={'Fan'}
            fontSize={60}
            buttonStyle={[styles.button, {backgroundColor: '#66cc66'}]}
          />
          <RNButton
            borderRadius={200}
            onPress={this.navigate.bind(this, 'ArtistAdmin')}
            title={'Artist'}
            fontSize={60}
            buttonStyle={[styles.button, {backgroundColor: '#8888ff'}]}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  button: {
    height: 200,
    width: 200,
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

const mapStateToProps = state => {
  return {
    authorized: state.authorized,
    userType: state.userType,
  }};

export default connect(mapStateToProps)(Options);
