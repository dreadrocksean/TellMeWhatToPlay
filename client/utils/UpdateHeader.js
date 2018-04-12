export const updateHeader = nextProps => {
  const { navigation, authorized, artist } = nextProps;
  console.log('authorized', authorized, artist);
  navigation.setParams({
    bg: authorized ? 'green' : 'red',
    // title: artist ? `RockOn ${artist.name}` : 'Options',
  });
};