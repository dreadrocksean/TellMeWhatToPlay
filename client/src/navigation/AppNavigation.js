import React from "react";
import { Text, Animated, Easing } from "react-native";
import {
  createStackNavigator
  // TransitionPresets
} from "@react-navigation/stack";
import { transitionConfig, noTransitionConfig } from "./Transitions";
import { connect } from "react-redux";

import Options from "../containers/Options";
import ArtistSignup from "../containers/ArtistSignup";
import CameraScreen from "../containers/CameraScreen";
import UserSignup from "../containers/UserSignup";
import FanSignup from "../containers/FanSignup";
import LoginScreen from "../containers/LoginScreen";
import ArtistAdmin from "../containers/ArtistAdmin";
import ArtistList from "../containers/ArtistList";
import SetList from "../containers/SetList";
import UserFormWrapper from "../services/user/UserFormWrapper";
import ArtistFormWrapper from "../services/artist/ArtistFormWrapper";
import Lyrics from "../containers/Lyrics";

const screens = {
  Options,
  ArtistSignup,
  ArtistList,
  SetList,
  Lyrics,
  UserSignup,
  FanSignup,
  LoginScreen,
  UserFormWrapper,
  ArtistFormWrapper,
  CameraScreen,
  ArtistAdmin
};

const Stack = createStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 2000,
    damping: 90,
    mass: 5,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    useNativeDriver: true
  }
};

const timingConfig = {
  animation: "timiing",
  config: {
    duration: 500,
    useNativeDriver: true
    // easing: Easing.easeOutElastic
    // easing: Easing.elastic(Easing.poly(4))
  }
};
const RootStack = ({ authorized }) => {
  const headerStyles = {
    headerStyle: { backgroundColor: authorized ? "green" : "red" },
    headerTintColor: authorized ? "white" : "black",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerBackTitleVisible: true,
    gestureEnabled: true
  };

  return (
    <Stack.Navigator
      initialRouteName="Options"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: config,
          close: config
        },
        ...headerStyles
      }}
      headerMode="float"
      animation="fade"
    >
      {Object.keys(screens).map((k, i) => (
        <Stack.Screen
          key={i}
          name={k}
          component={screens[k]}
          options={{ title: k }}
        />
      ))}
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  authorized: state.login.authorized
  // userType: state.login.userType,
  // artist: state.login.artist,
  // user: state.login.user,
  // errorMessage: state.login.errorMessage
});

export default connect(mapStateToProps)(RootStack);
