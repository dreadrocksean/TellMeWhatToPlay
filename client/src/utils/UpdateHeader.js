export const updateHeader = ({ navigation, authorized, artist = {} }) => {
  try {
    navigation.setParams({
      bg: authorized ? "#8888bb" : "#bb4444",
      title: `${navigation.state.routeName}${
        artist.name ? " (" + artist.name + ")" : ""
      }`
    });
  } catch (err) {
    console.error(`Problem updating header: ${err}`);
  }
};
