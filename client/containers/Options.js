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
import { updateHeader } from '../utils/UpdateHeader';

const {height, width} = Dimensions.get('window');

class Options extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: `${params.title || params.screen || 'Options'}`,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
      headerStyle:{
        backgroundColor: `${params.bg || 'red'}`,
      },
      headerLeft: null
    };
  };

  state = {};

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.artist === this.props.artist
      && nextProps.authorized === this.props.authorized
    ) {
      console.log('no change');
      return;
    }
    updateHeader(nextProps);
  }

  navigate(pageName) {
    const {navigate} = this.props.navigation;
    const action = pageName === 'ArtistAdmin'
      ? guestTypeArtist() : guestTypeFan();
    this.props.dispatch(action);
    navigate(pageName, {
      name: pageName,
    })
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
    authorized: state.login.authorized,
    userType: state.login.userType,
    artist: state.login.artist,
}};

export default connect(mapStateToProps)(Options);
