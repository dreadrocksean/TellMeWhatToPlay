import React from "react";
import { StyleSheet, View, YellowBox } from "react-native";
import { Provider } from "react-redux";

import createStore from "./redux/";
import ReduxNavigation from "./navigation/ReduxNavigation";

// create our store
const store = createStore();

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = { ...console };
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default class App extends React.Component {
  render() {
    const { authorized } = store.getState();
    const backgroundColor = authorized ? "#8888bb" : "#bb4444";
    return (
      <Provider store={store}>
        <View style={[styles.container, { backgroundColor }]}>
          <ReduxNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
