import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ArtistFormWrapper from '../services/artist/ArtistFormWrapper';

import DefaultContainer from './DefaultContainer';
import AppText from '../components/AppText';
import { updateHeader } from '../utils/UpdateHeader';

class ArtistSignup extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerStyle = Object.assign({},
      params.bg ? {backgroundColor: params.bg} : null
    );
    return {
      title: `${params.title || params.screen || 'Artist Profile'}`,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
      headerStyle,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      headingText: '',
    }
    updateHeader(props);
    
  }

  renderHeaderChildren() {
    /*return <AppText>{this.state.headingText}</AppText>*/
    return <AppText>ARTIST PROFILE</AppText>
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
