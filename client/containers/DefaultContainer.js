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

import Background from '../components/Background';
import ListHeader from '../components/ListHeader';

import bg from '../images/bg.png';

const { width, height } = Dimensions.get('window');

class DefaultContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) {
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
          home={this.props.goHome}
        >
          {this.props.headerChildren}
        </ListHeader>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
  },
});

export default DefaultContainer;

// const mapStateToProps = state => ({
//   authorized: state.login.authorized,
// });
// export default connect(mapStateToProps)(DefaultContainer);
