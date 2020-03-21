import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class DrawerContainer extends React.Component {

  state = {
    selectedItem: this.props.activeItemKey,
  }

  render() {
    const { navigation, activeItemKey } = this.props;
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate('screen1')}
          style={activeItemKey === 'screen1'
          ? styles.selDrawerItem
          : styles.drawerItem}>
          Screen 1
        </Text>
        <Text
          onPress={() => navigation.navigate('screen2')}
          style={activeItemKey === 'screen2'
          ? styles.selDrawerItem
          : styles.drawerItem}>
          Screen 2
        </Text>
        <Text
          onPress={() => navigation.navigate('screen3')}
          style={activeItemKey === 'screen3'
          ? styles.selDrawerItem
          : styles.drawerItem}>
          Screen 3
        </Text>
        <Text
          onPress={() => {
            const actionToDispatch = NavigationActions.reset({
              index: 0,
              key: null,  // black magic
              actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
            });
            this.props.navigation.dispatch(actionToDispatch);
          }}
          style={styles.drawerItem}>
          Logout
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  drawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  },
  selDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F00000',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#F00000',
    borderWidth: 3,
    textAlign: 'center'
  }
})