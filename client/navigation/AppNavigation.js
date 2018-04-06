import React from 'react';
import { Text, Animated, Easing } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import LoginScreen from '../containers/LoginScreen';
import Options from '../containers/Options';
import ArtistAdmin from '../containers/ArtistAdmin';
import ArtistList from '../containers/ArtistList';
import SetList from '../containers/SetList';
import UserForm from '../containers/UserForm';
import Lyrics from '../containers/Lyrics';

import SignupScreen from '../containers/SignupScreen';
import ForgottenPasswordScreen from '../containers/ForgottenPasswordScreen';
import Screen1 from '../containers/Screen1';
import Screen2 from '../containers/Screen2';
import Screen3 from '../containers/Screen3';
import DrawerContainer from '../containers/DrawerContainer';

const AppRouteConfigs = {
  // Options: { screen: Options },
  // ArtistList: { screen: ArtistList },
  // ArtistAdmin: { screen: ArtistAdmin },
  // SetList: { screen: SetList },
  // Lyrics: { screen: Lyrics },
};


// drawer stack
const DrawerStack = DrawerNavigator({
  screen1: { screen: Screen1 },
  screen2: { screen: Screen2 },
  screen3: { screen: Screen3 },
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer,
});

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'green'},
    title: 'Logged In to your app!',
    gesturesEnabled: false,
    headerLeft:
    	<Text onPress={() => {
    		if (navigation.state.index === 0) {
    			navigation.navigate('DrawerOpen');
    		} else {
    			navigation.navigate('DrawerClose');
    		}
    		
    	}}>Menu</Text>
  })
});

// login stack
const LoginStack = StackNavigator({
  Options: { screen: Options },
  ArtistList: { screen: ArtistList },
  ArtistAdmin: { screen: ArtistAdmin },
  SetList: { screen: SetList },
  Lyrics: { screen: Lyrics },
  UserForm: { screen: UserForm },

  loginScreen: { screen: LoginScreen },
  signupScreen: { screen: SignupScreen },
  forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: 'red'},
    title: 'You are not logged in'
  }
});

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig,
});

export default PrimaryNav;