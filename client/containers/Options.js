import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
// import { Provider } from 'unstated';

import { guestTypeArtist, guestTypeFan } from '../redux/actions/ActionCreator';
import {
  Dimensions, StyleSheet, Text, View, AsyncStorage, Image
} from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

import bg from '../images/bg.png';
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
          <View style={{alignItems: 'center'}} >
            <RNButton
              borderRadius={100}
              onPress={this.navigate.bind(this, 'ArtistList')}
              title={'I AM A FAN'}
              color={'rgba(0,0,0,0.9)'}
              fontSize={24}
              buttonStyle={[styles.button, {backgroundColor: '#62f9ff'}]}
            />
            <View style={styles.textSeparator}>
              <View style={styles.line} />
              <Text style={[styles.text, {flex: 2}]}>OR</Text>
              <View style={styles.line} />
            </View>
            <RNButton
              borderRadius={100}
              onPress={this.navigate.bind(this, 'ArtistAdmin')}
              title={'I AM AN ARTIST'}
              titleStyle={styles.buttonText}
              color={'rgba(0,0,0,0.9)'}
              fontSize={24}
              buttonStyle={[styles.button, {backgroundColor: '#ffd52b'}]}
            />
            <Text style={[styles.text, styles.textCustomPos]}>PLEASE SELECT</Text>
          </View>
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
  text: {
    color: 'rgba(220,220,255,0.9)',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    // fontFamily: 'cochin',
  },
  textCustomPos: {
    position: 'absolute',
    top: -60,
  },
  button: {
    height: 70,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  textSeparator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    width: width * 0.6,
  },
  line: {
    borderBottomColor: 'rgba(220,220,255,0.9)',
    borderBottomWidth: 3,
    flex: 3,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
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
