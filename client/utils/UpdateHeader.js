export const updateHeader = ({ navigation, authorized, artist }) =>
  navigation.setParams({
    bg: authorized ? "#8888bb" : "#bb4444",
    title: `${navigation.state.routeName} (${(artist || {}).name})`
  });
