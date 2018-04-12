import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtistForm from './ArtistForm';
import { loginArtist } from '../../redux/actions/ActionCreator';

import { createArtist, updateArtist } from '../api';

class ArtistFormWrapper extends Component {

	constructor(props) {
		super(props);
		this.state = {
			artistName: '',
      artistNameComplete: '',
			errorMessage: '',
		};
	}

  resetErrorMessage() {
  	this.setState({errorMessage: ''});
  }

  handleChange(field) {
    const key = Object.keys(field)[0];
    this.setState({[key]: field[key]});
    this.setState(field);
  }

  async onSubmit() {
    try {
      const response = await createArtist(this.state.artistName);
      this.props.dispatch(loginArtist(response.artist));
      this.setState({successMessage: `Successfully created ${this.state.artistName}!`});
    } catch(err) {
      console.log('error:', err);
      this.setState({errorMessage: `Problem creating ${this.state.artistName}`});
    }
  }

  render() {
    return (
      <ArtistForm
        handleChange={this.handleChange.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        artistNameComplete={this.state.artistNameComplete}
        artistName={this.state.artistName}
        submitText={'Add Me'}
        errorMessage={this.state.errorMessage}
        successMessage={this.state.successMessage}
      />
    );
	}

}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = () => ({
  loginArtist
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistFormWrapper);