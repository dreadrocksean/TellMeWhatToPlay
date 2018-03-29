import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  StyleSheet, Text, View, ScrollView
  , ActivityIndicator, AsyncStorage
  , Animated, PanResponder
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button as RNButton, Icon } from 'react-native-elements';

import ArtistForm from './ArtistForm';
import ArtistItem from './ArtistItem';

import { fetchArtists, createArtist, updateArtist, deleteArtist } from '../constants/api';

export default class ArtistList extends Component {

  static navigationOptions = {
    title: 'Artist List',
  };

  static defaultProps = { fetchArtists, createArtist, updateArtist, deleteArtist };

  state = { name: null, edit_name: null,
    loading: false, update: null, add: false, artists: [],
    nameComplete: '',
  };

  componentDidMount() {
    this.loadStorage();
    this.updateArtistList();
  }

  async loadStorage() {
    try {
      const username = await AsyncStorage.getItem('username');
      if (username === null) { return; }
      this.setState({username});
    } catch(e) {
      console.log('Error getting storage username: ', e);
    }
  }

  async addArtist() {
    const {name} = this.state;
    console.log(this.state);
    if (!name) {
      this.setState({add: false});
      return;
    }
    try {
      const newArtist = await this.props.createArtist({
        name: name.trim()
      });
      console.log('Success!: ', newArtist);
      this.updateArtistList();
    } catch (err) {
      console.error('ERROR creating artist', err);
      this.setState({add: false})
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

  async updateArtistItem(artistId) {
    const {edit_name} = this.state;
    try {
      const updatedArtist = await this.props.updateArtist({ _id: artistId, name: edit_name });
      console.log('Updated Success!: ', updatedArtist);
      this.setState({update: null})
      this.updateArtistList();
      this.setState({edit_: '',});name
    } catch (err) {
      console.error('ERROR updating artist', err);
      this.setState({update: null})
    }
  }

  deleteArtist(artistId) {
    try {
      this.props.deleteArtist(artistId);
      this.updateArtistList();
    } catch (err) {
      console.error('ERROR deleting artist', err);
    }
  }

  handleEditChange(field) {
    const key = Object.keys(field)[0];
    this.setState({['edit_'+key]: field[key]});
  }

  openAddForm() {
    this.setState({
      add: true,
      nameComplete: '',
      edit_name: '',
      name: '',
    });
  }

  handleChange(field) {
    const key = Object.keys(field)[0];
    this.setState({['edit_'+key]: field[key]});
    // this.fetchArtistList(field);
    this.setState(field);
  }

  async showSetList(i, artistId) {
    const { navigate } = this.props.navigation;
    const {name} = this.state.artists.find( el => {
      return el._id === artistId;
    });

    try {
      const data = await this.props.fetchArtistSongs(artistId);
      const setList = data.result;
      navigate('SetList', { name: 'SetList', setList })
    } catch (err) {
      navigate('SetList', { name: 'SetList', setList: 'Sorry. No setList available :-(' })
    }
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
        {/*<Text style={styles.text}>Artist List</Text>*/}

        {this.state.add && (
          <ArtistForm
            handleChange={this.handleChange.bind(this)}
            onSubmit={this.addArtist.bind(this)}
            edit_name={this.state.edit_name}
            command={'Add'}
            nameComplete={this.state.nameComplete}
          />
        )}
        {!this.state.add &&
          <RNButton
            backgroundColor={'#8888ff'}
            borderRadius={10}
            icon={{name: 'music', type: 'font-awesome'}}
            onPress={this.openAddForm.bind(this)}
            name={'Add Artist'}
          />
        }

        <ScrollView style={styles.scroll}
          pagingEnabled = {true}
        >
          {this.state.artists.map((artist, i) => {
            return (
              <ArtistItem
                  key={i}
                  artist={artist}
                  showSetList={this.showSetList.bind(this)}
                  deleteArtist={this.deleteArtist.bind(this)}
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
    marginTop: 20,
    // backgroundColor: '#ddd',
    alignItems: 'stretch',
    // justifyContent: 'center',
    padding: 5,
  },
  scroll: {
    flex: 1,
    marginTop: 10,
  },
  text: {
    fontSize: 36,
    textAlign: 'center', 
  },
});
