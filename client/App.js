import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import useLinking from "./src/navigation/useLinking";
import createStore from "./src/store";
// import ReduxNavigation from "./src/navigation/ReduxNavigation";
import AppNavigation from "./src/navigation/AppNavigation";

// create our store
const store = createStore();
const { authorized } = store.getState();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  const asyncFontLoad = async () => {
    try {
      await Font.loadAsync({
        "montserrat-bold": require("./src/assets/fonts/montserrat/Montserrat-Bold.otf"),
        "montserrat-black": require("./src/assets/fonts/montserrat/Montserrat-Black.ttf"),
        "montserrat-regular": require("./src/assets/fonts/montserrat/Montserrat-Regular.ttf"),
        "montserrat-thin": require("./src/assets/fonts/montserrat/Montserrat-Thin.ttf")
      });
      console.log("Fonts loaded successfully");
      Promise.resolve();
    } catch (err) {
      Promise.reject(`Error loading fonts: ${err}`);
    }
  };

  const _cacheResourcesAsync = async () => {
    const images = [
      require("./src/images/bg.png"),
      require("./src/images/logo.png"),
      require("./src/images/buttons/artist_btn.png"),
      require("./src/images/buttons/fan_btn.png"),
      require("./src/images/buttons/signup_btn.png"),
      require("./src/images/buttons/login_btn.png"),
      require("./src/images/buttons/continue_btn.png"),
      require("./src/images/buttons/manage_btn.png"),
      require("./src/images/buttons/logout_btn.png"),
      require("./src/images/buttons/offair_btn.png"),
      require("./src/images/buttons/onair_btn.png"),
      require("./src/images/buttons/trash_btn.png"),
      require("./src/images/buttons/mute_btn.png"),
      require("./src/images/buttons/unmute_btn.png"),
      require("./src/images/icons/success_icon.png"),
      require("./src/images/icons/add_song_icon.png"),
      require("./src/images/icons/close_icon.png"),
      require("./src/images/icons/edit_btn.png"),
      require("./src/images/icons/artist_thumb.png"),
      require("./src/images/icons/lyrics_btn1.png")
    ];

    const cacheImages = images.map(image =>
      Asset.fromModule(image).downloadAsync()
    );
    return Promise.all(cacheImages);
  };

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        setInitialNavigationState(await getInitialState());

        await asyncFontLoad();
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
    _cacheResourcesAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <AppNavigation />
        </NavigationContainer>
      </Provider>
    );
  }
}
