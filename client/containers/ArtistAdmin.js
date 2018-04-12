import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import {
  Dimensions, StyleSheet, Text, View, AsyncStorage, Image, Switch, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';
import { onAir, offAir, loginArtist } from '../redux/actions/ActionCreator';
import { LoginArtist } from '../redux/actions/ActionTypes';
// import { Provider, Subscribe, Container } from 'unstated';

import { updateArtist } from '../services/api';
import { loadStorage } from '../services/LocalStorage';
import UserFormWrapper from '../services/user/UserFormWrapper';
import ArtistFormWrapper from '../services/artist/ArtistFormWrapper';

import onair_off from '../images/onair_off_small.png';
import onair_on from '../images/onair_on_small.png';
import { updateHeader } from '../utils/UpdateHeader';

const {height, width} = Dimensions.get('window');

class ArtistAdmin extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerStyle = Object.assign({},
      params.bg ? {backgroundColor: params.bg} : null
    );
    return {
      title: `${params.title || params.screen || 'Artist Admin'}`,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
      headerStyle,
    };
  };

  static defaultProps = { updateArtist };

  state = {
    user: null,
    onAir: false,
    showModal: true,
    edit_email: '',
    edit_password: '',
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate', prevProps, this.props);
    const { showModal } = this.state;
    const { authorized, navigation } = this.props;
    if (!showModal && !authorized) {
      this.props.navigation.goBack();
    }
  }

  async componentDidMount() {
    const artist = await loadStorage('artist');
    if (!this.props.artist && artist) {
      this.props.dispatch(loginArtist(artist));
    }
    updateHeader(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.artist === this.props.artist
      && nextProps.authorized === this.props.authorized
    ) {return;}
    updateHeader(nextProps);
  }

  async componentDidUnMount() {
    const response = await this.props.updateArtist({
      _id: artist._id,
      live: false
    });
  }

  navigate(pageName) {
    const { user, artist } = this.state;
    const {navigate} = this.props.navigation;
    navigate(pageName, { name: pageName, artist });
  }

  async toggleOnAir() {
    const { artist } = this.state;
    if (!artist) { return; }
    const response = await this.props.updateArtist({
      _id: artist._id,
      live: !artist.live
    });
    this.setState({ artist: response.artist });
  }

  renderButton (text, onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  handleError(err, msg) {
    this.setState({
      showModal: true,
      authorized: false,
      errorMessage: msg,
    });
  }

  renderOnAirImage() {
    const { artist } = this.props;
    const source = (artist || {}).live ? onair_on : onair_off;
    return <Image style={styles.image} source={source} />
  }

  render() {
    const { user, onAir, showModal } = this.state;
    const { authorized, artist, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.onair}>
            <TouchableOpacity style={styles.onairButton} onPress={this.toggleOnAir.bind(this)} >
              { this.renderOnAirImage() }
            </TouchableOpacity>
          </View>

          <View style={styles.headerText}>
            {artist &&
              <Text style={{backgroundColor: 'blue'}}>
                {`Welcome ${artist.name.toUpperCase()}`}
              </Text>
            }
          </View>

          <View style={styles.headerText}>
            {artist &&
              <Text style={{backgroundColor: 'blue'}}>
                {`Welcome ${artist.name.toUpperCase()}`}
              </Text>
            }
          </View>
          
          <TouchableOpacity style={styles.onairButton} onPress={this.toggleOnAir.bind(this)} >
            { this.renderOnAirImage() }
          </TouchableOpacity>
        </View>
        <RNButton
          borderRadius={10}
          icon={{name: 'music', type: 'font-awesome'}}
          onPress={this.navigate.bind(this, 'SetList')}
          title={'Manage SetList'}
          fontSize={36}
          buttonStyle={styles.button}
        />
        <Modal  style={styles.modalContainer}
          isVisible={(!authorized && showModal) || !artist}
          backdropColor={'#000'}
          backdropOpacity={0.7}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          <View>
            {!authorized && <UserFormWrapper
              onGoBack={navigation.state.params.onGoBack}
            />}
            {authorized && !artist && <ArtistFormWrapper
            />}
            {this.renderButton(
              'Cancel',
              () => {
                this.setState({
                  showModal: false,
                })
              }
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#ddddff',
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#ffdddd',
    alignItems: 'center',
    height: 60
  },
  headerText: {
    flex: 1
  },
  onair: {
    flex: 1
  },
  onairButton: {
    flex: 1
  },
  hamburger: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 36,
    textAlign: 'center', 
  },
  switch: {
    // flex: 1,
    alignItems: 'center',
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    // resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    // margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  artist: state.login.artist,
  showModal: state.login.showModal,
  errorMessage: state.login.errorMessage,
});

export default connect(mapStateToProps)(ArtistAdmin);
