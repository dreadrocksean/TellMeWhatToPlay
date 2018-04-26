import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import {
  Dimensions, StyleSheet, Image, Text, View, ScrollView
  , ActivityIndicator, AsyncStorage
  , Animated, PanResponder
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import DefaultContainer from './DefaultContainer';
import AppText from '../components/AppText';
import ArtistItem from '../components/ArtistItem';
import { updateHeader } from '../utils/UpdateHeader';

import sortIcon from '../images/icons/sort_btn.png';
import findIcon from '../images/icons/find_btn.png';
import { fetchArtists } from '../services/api';

const { width, height } = Dimensions.get('window');

class ArtistList extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerStyle = Object.assign({},
      params.bg ? {backgroundColor: params.bg} : null
    );
    return {
      title: `${params.title || params.screen || 'Artist List'}`,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
      headerStyle,
    };
  };

  static defaultProps = { fetchArtists };

  constructor(props) {
    super(props);
    this.state = { name: null, edit_name: null,
      loading: false, update: null, add: false, artists: [],
      nameComplete: '',
    };
    updateHeader(this.props);
  }

  componentDidMount() {
    this.updateArtistList();
  }

  async updateArtistList() {
    // this.setState({ loading: true });
    try {
      const data = await this.props.fetchArtists();
      const artists = data.artists;

      this.setState({ artists, loading: false, update: false, add: false, name: '' });
    } catch (err) {
      console.log('ERROR: ', err);
      this.setState({ loading: false, update: false, add: false });
    }
  }

  showSetList(artist) {
    // console.log('showSetList artist', artist);
    const { navigate } = this.props.navigation;
    navigate('SetList', { name: 'SetList', artist })
  }

  home() {
    this.props.navigation.navigate('Options');
  }

  renderHeaderChildren() {
    return (
      <View style={styles.headerContainer}>
        <Image style={styles.icon}
          source={sortIcon}
          resizeMode={'cover'}
        />
        <Image style={styles.icon}
          source={findIcon}
          resizeMode={'cover'}
        />
        <AppText
          textStyle={[styles.text,]}
        >ARTIST LIST</AppText>
      </View>
    );
  }

  render() {
    return (
      <DefaultContainer
        loading={this.state.loading}
        headerChildren={this.renderHeaderChildren()}
        navigation={this.props.navigation}
      >
        <ScrollView style={styles.scroll}
          pagingEnabled = {true}
        >
          {this.state.artists.map((artist, i) => {
            return (
              <ArtistItem
                key={i}
                artist={artist}
                showSetList={this.showSetList.bind(this, artist)}
              />
            )
          })}
        </ScrollView>
      </DefaultContainer>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 60,
  },
  headerContainer: {
    // backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    textAlign: 'right',
    color: 'white',
    fontSize: 17,
    fontFamily: 'montserrat-regular',
  },
});

const mapStateToProps = state => ({
  authorized: state.login.authorized,
});
export default connect(mapStateToProps)(ArtistList);
