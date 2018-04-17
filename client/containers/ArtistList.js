import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import {
  Dimensions, StyleSheet, Image, Text, View, ScrollView
  , ActivityIndicator, AsyncStorage
  , Animated, PanResponder
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button as RNButton, Icon } from 'react-native-elements';

import ArtistItem from '../components/ArtistItem';
import { updateHeader } from '../utils/UpdateHeader';
import ListHeader from '../components/ListHeader';
import Background from '../components/Background';

import bg from '../images/bg.png';
import sortIcon from '../images/list/sort_btn.png';
import findIcon from '../images/list/find_btn.png';
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
    this.loadStorage();
    this.updateArtistList();
  }

  async loadStorage() {
    try {
      const username = await AsyncStorage.getItem('user');
      const user = JSON.parse(userJson).user;
      if (!user) { return; }
      this.setState({user});
    } catch(e) {
      console.log('Error getting storage username: ', e);
    }
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
    const { navigate } = this.props.navigation;
    navigate('SetList', { name: 'SetList', artist })
  }

  home() {
    this.props.navigation.navigate('Options');
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Background />
        <ListHeader style={{height: 50}}
          home={this.home.bind(this)}
        >
          <View style={styles.iconsContainer}>
            <Image style={styles.icon}
              source={sortIcon}
              resizeMode={'cover'}
            />
            <Image style={styles.icon}
              source={findIcon}
              resizeMode={'cover'}
            />
          </View>
        </ListHeader>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
  },
  scroll: {
    flex: 1,
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
  },
  icon: {
    width: 30,
    height: 30,
  }
});

const mapStateToProps = state => ({
  authorized: state.login.authorized,
});
export default connect(mapStateToProps)(ArtistList);
