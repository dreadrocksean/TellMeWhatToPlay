export const updateHeader = props => {
  const { navigation, authorized, artist } = props;
  // console.log('updateHeader-authorized/artist', authorized, artist);
  navigation.setParams({
    bg: authorized ? 'green' : 'red',
    // title: artist ? `RockOn ${artist.name}` : 'Options',
  });
};