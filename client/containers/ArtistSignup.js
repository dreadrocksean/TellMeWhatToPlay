import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ArtistFormWrapper from '../services/artist/ArtistFormWrapper';

import DefaultContainer from './DefaultContainer';

class ArtistSignup extends Component {

  componentDidMount() {
    // console.log('props', this.props);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate userType', this.props.userType);
    this.navigateTo();
  }

  navigateTo() {
    const { user, artist } = this.props;
    let routeName;
    // console.log('getRouteName', userType, user, artist);
    if(user && !artist) {
      routeName = 'ArtistSignup';
    }
    if(user && artist) {
      routeName = 'ArtistAdmin';
    }
    if (!routeName) {return;}
    this.props.navigation.navigate(routeName, {name: routeName});
  }

  render() {
    return (
      <DefaultContainer style={styles.body}>
        <ArtistFormWrapper />
      </DefaultContainer>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
  },
})

const mapStateToProps = state => {
  // console.log('mapStateToProps state', state);
  return {
    user: state.login.user,
    artist: state.login.artist,
  }
}

export default connect(mapStateToProps)(ArtistSignup);
