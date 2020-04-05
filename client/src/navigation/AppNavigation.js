import React from "react";
import { Text, Button, Animated, Easing } from "react-native";
import {
  createStackNavigator
  // TransitionPresets
} from "@react-navigation/stack";
import { transitionConfig, noTransitionConfig } from "./Transitions";
import { connect } from "react-redux";

import { logout } from "src/store/actions/ActionCreator";
import Home from "../containers/Home";
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
  Home,
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
    duration: 300,
    useNativeDriver: true,
    easing: Easing.easeOutElastic
    // easing: Easing.elastic(Easing.poly(4))
  }
};
const RootStack = ({ authorized, logout }) => {
  const textColor = authorized ? "white" : "black";
  const backgroundColor = authorized ? "green" : "red";
  const headerStyles = {
    headerStyle: { backgroundColor },
    headerTintColor: textColor,
    headerTitleStyle: { fontWeight: "bold" },
    headerBackTitleVisible: true,
    gestureEnabled: true
  };

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureDirection: "horizontal",
        transitionSpec: {
          open: timingConfig,
          close: timingConfig
        },
        headerRight: () =>
          authorized && (
            <Button onPress={logout} title="LogOut" color={textColor} />
          ),
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
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootStack);
