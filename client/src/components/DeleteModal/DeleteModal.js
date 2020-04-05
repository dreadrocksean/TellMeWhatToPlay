import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import Modal from "src/components/Modal";
import AppText from "src/components/AppText";
import yesButton from "src/images/buttons/yes_btn.png";
import noButton from "src/images/buttons/no_btn.png";

const DeleteModal = ({ setShowModal, confirm }) => {
  const hide = () => setShowModal(false);
  const _confirm = state => () => confirm(state);

  return (
    <Modal dismiss={hide} hideCloseButton={true} styles={styles.root}>
      <View style={styles.container}>
        <AppText
          style={{ flex: 1 }}
          textStyle={[styles.text, { color: "white" }]}
        >
          DELETE SONG
        </AppText>
        <AppText style={{ flex: 1 }} textStyle={styles.text}>
          Are you sure you want to delete this song from SetList?
        </AppText>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={_confirm(false)}
          >
            <Image style={styles.image} source={noButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={_confirm(true)}
          >
            <Image style={styles.image} source={yesButton} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
