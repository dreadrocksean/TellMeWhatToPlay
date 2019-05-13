import React from "react";
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import { Text, Animated, Easing } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { transitionConfig, noTransitionConfig } from "./Transitions";

import CameraScreen from "../containers/CameraScreen";
import Options from "../containers/Options";
import ArtistSignup from "../containers/ArtistSignup";
import UserSignup from "../containers/UserSignup";
import FanSignup from "../containers/FanSignup";
import LoginScreen from "../containers/LoginScreen";
import ArtistAdmin from "../containers/ArtistAdmin";
import ArtistList from "../containers/ArtistList";
import SetList from "../containers/SetList";
import UserFormWrapper from "../services/user/UserFormWrapper";
import Lyrics from "../containers/Lyrics";

const AppRouteConfigs = {
  Options: { screen: Options },
  ArtistSignup: { screen: ArtistSignup },
  ArtistList: { screen: ArtistList },
  SetList: { screen: SetList },
  Lyrics: { screen: Lyrics },
  UserSignup: { screen: UserSignup },
  FanSignup: { screen: FanSignup },
  LoginScreen: { screen: LoginScreen },
  UserFormWrapper: { screen: UserFormWrapper },
  CameraScreen: { screen: CameraScreen },
  ArtistAdmin: { screen: ArtistAdmin }
};

// app stack
const AppStack = StackNavigator(AppRouteConfigs, {
  headerMode: "float",
  mode: "card",
  navigationOptions: navigation => ({
    headerStyle: { backgroundColor: "red" },
    title: "You are not logged in"
  }),
  transitionConfig
});

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    AppStack: { screen: AppStack }
  },
  {
    // Default config for all screens
    headerMode: "none",
    title: "Main",
    initialRouteName: "AppStack",
    transitionConfig: noTransitionConfig
  }
);

export default PrimaryNav;
