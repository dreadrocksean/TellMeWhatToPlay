import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    // backgroundColor: '#ddd',
    alignItems: 'stretch',
    // justifyContent: 'center',
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 25,
    width: 25,
  },
  scroll: {
    flex: 1,
    marginTop: 10,
  },
  text: {
    fontSize: 36,
    // textAlign: 'left', 
    color: 'white',
    fontFamily: 'montserrat-regular',
  },
  artistInfo: {
    height: 70,
    justifyContent: 'center',
    marginLeft: 10,
    // backgroundColor: 'rgba(220,220,255,0.9)',
  },
  artistInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  }
});