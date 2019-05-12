import React from "react";
import * as ReactNavigation from "react-navigation";
import { connect } from "react-redux";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

import AppNavigation from "./AppNavigation";

const ReduxNavigation = reduxifyNavigator(AppNavigation, "root");

const mapStateToProps = state => ({ state: state.nav });

export default connect(mapStateToProps)(ReduxNavigation);
