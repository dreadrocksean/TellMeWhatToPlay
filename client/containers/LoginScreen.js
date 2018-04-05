import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    return (
      <View style={styles.container}>
        <Text>I am Login Screen</Text>

        <Text
          style={styles.linky}
          onPress={() => navigate('signupScreen')} >
          Go to Signup
        </Text>

        <Text
          style={styles.linky}
          onPress={() => navigate('forgottenPasswordScreen')} >
          Go to Forgot Password
        </Text>

        <Text
          style={styles.linky}
          onPress={() => navigate('drawerStack')} >
          Pretend we logged in
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linky: {
    color: 'blue',
    paddingTop: 10
  }
});