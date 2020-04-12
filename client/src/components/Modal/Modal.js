import React from "react";
import { connect } from "react-redux";
import {
  Platform,
  ScrollView,
  Dimensions,
  View,
  Image,
  TouchableOpacity
} from "react-native";

import styles from "./styles";

import { setModalContent } from "src/store/actions/ActionCreator";
import AppText from "src/components/AppText";
import closeIcon from "src/images/icons/close_icon.png";

const Modal = ({
  style,
  showModal,
  modalContent,
  setModalContent,
  hideCloseButton,
  height
}) => {
  const handleClose = () => setModalContent(null);
  const heightStyle = height ? { height } : { flex: 1 };

  return showModal ? (
    <View style={{ ...styles.root, ...style }}>
      {/*<ScrollView style={{ alignSelf: "stretch" }}>*/}
      <View style={{ ...styles.modal, ...heightStyle }}>
        {modalContent}
        {!hideCloseButton && (
          <TouchableOpacity style={styles.closeWrapper} onPress={handleClose}>
            <Image source={closeIcon} style={styles.close} />
          </TouchableOpacity>
        )}
      </View>
      {/*</ScrollView>*/}
    </View>
  ) : null;
};

const mapDispatchToProps = dispatch => ({
  setModalContent: content => dispatch(setModalContent(content))
});

const mapStateToProps = state => ({
  showModal: state.modal.show,
  modalContent: state.modal.content,
  height: state.modal.height,
  hideCloseButton: state.modal.hideCloseButton
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
