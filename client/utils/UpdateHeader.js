export const updateHeader = props => {
  const { navigation, authorized, artist } = props;
  console.log("updateHeader navigation: ", navigation);
  // console.log('updateHeader-authorized/artist', authorized, artist);
  navigation.setParams({
    bg: authorized ? "#8888bb" : "#bb4444",
    title: `${navigation.state.routeName} (${(artist || {}).name})`
  });
};
