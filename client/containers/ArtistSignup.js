import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ArtistFormWrapper from '../services/artist/ArtistFormWrapper';

import DefaultContainer from './DefaultContainer';
import AppText from '../components/AppText';

class ArtistSignup extends Component {

  state = {
    headingText: '',
  }

  componentDidUpdate() {
    this.navigateTo();
  }

  navigateTo() {
    const { user, artist } = this.props;
    let routeName;
    // console.log('getRouteName', userType, user, artist);
    if(user && !artist) {
      routeName = 'ArtistSignup';
      this.setState({headingText: 'ARTIST PROFILE'})
    }
    if(user && artist) {
      routeName = 'ArtistAdmin';
      this.setState({headingText: ' ARTIST ADMIN'})
    }
    if (!routeName) {return;}
    this.props.navigation.navigate(routeName, {name: routeName});
  }

  renderHeaderChildren() {
    return <AppText>{this.state.headingText}</AppText>
  }

  render() {
    return (
      <DefaultContainer style={styles.body}
        headerChildren={this.renderHeaderChildren()}
      >
        <ArtistFormWrapper navigation={this.props.navigation}/>
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
