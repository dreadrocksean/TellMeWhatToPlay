import React from "react";
// import * as ReactNavigation from "@react-navigation/native";
import { connect } from "react-redux";
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

import AppNavigation from "./AppNavigation";

const ReduxNavigation = createReduxContainer(AppNavigation, "root");

const mapStateToProps = state => ({ state: state.nav });

export default connect(mapStateToProps)(ReduxNavigation);
