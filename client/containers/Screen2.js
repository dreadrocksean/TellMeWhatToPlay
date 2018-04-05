import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class Screen1 extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Screen Two',
    drawerIcon: () => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=2`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      >
      </Image>
    )
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Screen 2</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
