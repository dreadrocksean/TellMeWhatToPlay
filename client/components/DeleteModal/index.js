import React, { Component } from 'react';
import { Dimensions, View, Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import Modal from '../../components/Modal';
import AppText from '../../components/AppText';

import yesButton from '../../images/buttons/yes_btn.png';
import noButton from '../../images/buttons/no_btn.png';

const { width, height } = Dimensions.get('window');

class DeleteModal extends Component {

  constructor(props) {
    super(props)
    this.hide = this.hide.bind(this);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
  }

  hide() {
    this.props.setShowModal(false);
  }

  yes() {
    this.props.confirm(true);
  }

  no() {
    this.props.confirm(false);
  }

  render() {

    return this.props.showModal ?
      (
        <Modal
          dismiss={this.hide} hideCloseButton={true}
          styles={{padding: 15}}
        >
          <AppText
            style={{flex:1}}
            textStyle={[styles.text, {color: 'white'}]}
          >
            DELETE SONG
          </AppText>
          <AppText
            style={{flex:1}}
            textStyle={styles.text}
          >
            Are you sure you want to delete this song from SetList?
          </AppText>
          <View style={styles.row} >
            <TouchableOpacity style={styles.imageWrapper}
              onPress={this.no}>
              <Image style={styles.image} source={noButton} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageWrapper}
              onPress={this.yes}>
              <Image style={styles.image} source={yesButton} />
            </TouchableOpacity>
          </View>
        </Modal>
      )
      : null;
  };

}

export default DeleteModal;