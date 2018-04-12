import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import createStore from './redux/';
import ReduxNavigation from './navigation/ReduxNavigation';

// create our store
const store = createStore();

export default class App extends React.Component {
  render() {
    const { authorized } = store.getState();
    const backgroundColor = authorized ? '#66cc66' : '#ff0000';
    return (
      <Provider store={store}>
        <View style={[styles.container, {backgroundColor}]}>
          <ReduxNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})