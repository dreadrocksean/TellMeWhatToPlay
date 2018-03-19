import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { Button as RNButton, Icon } from 'react-native-elements';

import SongForm from './components/SongForm';
import SongItem from './components/SongItem';
import { fetchSongs, createSong, updateSong, deleteSong, upvoteSong, fetchLastFMSong,} from './constants/api';

export default class App extends Component {

  static defaultProps = { fetchSongs, createSong, updateSong, deleteSong, upvoteSong, fetchLastFMSong,};

  state = { title: null, author: null, edit_title: null, edit_author: null,
    loading: false, update: null, add: false, songs: [],
    titleComplete: '', artistComplete: '',
  };

  componentDidMount() {
    this.updateSongList();
  }

  async updateSongList() {
    this.setState({ loading: true });
    try {
      const data = await this.props.fetchSongs();
      const songs = data.songs.sort((a, b) => {
        return
          a.currVotes < b.currVotes
          || a.createdAt < b.createdAt;
      });
      this.setState({ songs });
    } catch (err) {
      console.error('ERROR: ', err);
    }
    this.setState({ loading: false, update: false, add: false });
  }

  async getLastFMSongList(songName) {
    if (!songName) {
      this.openAddForm();
      return;
    }
    try {
      const data = await this.props.fetchLastFMSong(songName);
      const songs = data.results.trackmatches.track.map(song => ({title:song.name, author:song.artist}));
      this.setState({
        titleComplete: songs[0].title,
        artistComplete: songs[0].author,
        title: songs[0].title,
        author: songs[0].author,
      });
    } catch (err) {
      console.error('ERROR: ', err);
    }
  }

  async addSong() {
    const {title, author} = this.state;
    if (!title || !author) {
      this.setState({add: false});
      return;
    }
    try {
      const newSong = await this.props.createSong({
        title: title.trim(), author: author.trim(),
      });
      console.log('Success!: ', newSong);
      this.setState({add: false})
      this.updateSongList();
      this.setState({title: '', author: ''});
    } catch (err) {
      console.error('ERROR creating song', err);
      this.setState({add: false})
    }
  }

  async updateSongItem(songId) {
    const {edit_title, edit_author} = this.state;
    try {
      const updatedSong = await this.props.updateSong({ _id: songId, title: edit_title, author: edit_author });
      console.log('Updated Success!: ', updatedSong);
      this.setState({update: null})
      this.updateSongList();
      this.setState({edit_title: '', edit_author: ''});
    } catch (err) {
      console.error('ERROR updating song', err);
      this.setState({update: null})
    }
  }

  showEditForm(i, songId) {
    const {title, author} = this.state.songs.find( el => {
      return el._id === songId;
    });
    this.setState({edit_title: title, edit_author: author, update: i});
  }

  deleteSong(songId) {
    console.log('songId', songId);
    try {
      this.props.deleteSong(songId);
      this.updateSongList();
    } catch (err) {
      console.error('ERROR creating song', err);
    }
  }

  vote(songId) {
    console.log(songId);
    try {
      this.props.upvoteSong({ _id: songId });
      this.updateSongList();
    } catch (err) {
      console.error('ERROR creating song', err);
    }
  }

  handleChange(field) {
    this.getLastFMSongList(field.title);
    this.setState(field);
  }

  handleEditChange(field) {
    const key = Object.keys(field)[0];
    this.setState({['edit_'+key]: field[key]});
  }

  openAddForm() {
    console.log('openform')
    this.setState({
      add: true,
      titleComplete: '',
      artistComplete: '',
      title: '',
      author: '',
    });
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
        <Text style={styles.text}>Tell Me What To Play!</Text>

        {this.state.add && (
          <SongForm
            handleChange={this.handleChange.bind(this)}
            onSubmit={() => this.addSong()}
            title={this.state.title}
            author={this.state.author}
            command={'Add'}
            titleComplete={this.state.titleComplete}
            artistComplete={this.state.artistComplete}
          />
        )}
        {!this.state.add &&
          <RNButton
            backgroundColor={'#8888ff'}
            borderRadius={10}
            icon={{name: 'music', type: 'font-awesome'}}
            onPress={this.openAddForm.bind(this)}
            title={'Add Song'}
          />
        }

        <ScrollView style={styles.scroll}
          pagingEnabled = {true}
        >
          {this.state.songs.map((song, i) => {
            return this.state.update === i
              ? <SongForm
                  key={i}
                  handleChange={this.handleEditChange.bind(this)}
                  onSubmit={() => this.updateSongItem(song._id)}
                  title={this.state.edit_title}
                  author={this.state.edit_author}
                  command={'Updt'}
              />
              : <SongItem
                  key={i}
                  song={song}
                  vote={this.vote.bind(this)}
                  showEditForm={() => this.showEditForm(i, song._id)}
                  deleteSong={this.deleteSong.bind(this)}
              />
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
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
