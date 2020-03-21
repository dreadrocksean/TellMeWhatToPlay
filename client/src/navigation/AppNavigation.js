import React from "react";
import { Text, Animated, Easing } from "react-native";
import {
  createStackNavigator
  // TransitionPresets
} from "@react-navigation/stack";
import { transitionConfig, noTransitionConfig } from "./Transitions";

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
    damping: 300,
    mass: 100,
    overshootClamping: true,
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
const RootStack = () => (
  <Stack.Navigator
    initialRouteName="Options"
    screenOptions={{
      gestureEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: config,
        close: config
      },
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }}
    headerMode="float"
    animation="fade"
  >
    {Object.keys(screens).map((k, i) => (
      <Stack.Screen
        key={i}
        name={k}
        component={screens[k]}
        options={{
          headerStyle: { backgroundColor: "red" },
          // headerTintColor: "white",
          title: k
        }}
      />
    ))}
  </Stack.Navigator>
);

export default RootStack;
