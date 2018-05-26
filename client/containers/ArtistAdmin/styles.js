import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'grey',
  },
  icon: {
    width: 45,
    height: 45,
  },
  buttonWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    // height: 50,
  },
  button: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    padding: 5,
    paddingBottom: 35,
    backgroundColor: 'transparent',
  },
  top: {
    flex: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
    // backgroundColor: '#666',
  },
  middle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: 75,
    // backgroundColor: '#888',
  },
  bottom: {
    flex: 3,
    paddingHorizontal: 20,
    // height: 150,
    // backgroundColor: '#aaa',
  },
  bottomInner: {
    flex:1,
    // alignSelf:'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#955'
  },
  headingText: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'normal',
    textAlign: 'center',
    fontFamily: 'montserrat-regular',
  },
  mainBox: {
    alignItems: 'center',
    width: '40%',
  },
  h2: {
    fontSize: 12,
    fontWeight:'normal',
    color: '#ffb401',
    fontFamily: 'montserrat-regular',
  },
  h3: {
    fontSize: 16,
    fontWeight:'normal',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'montserrat-regular',
  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  onair: {
    // flex: 1
  },
  onairButton: {
    // flex: 1
  },
  hamburger: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 36,
    textAlign: 'center', 
  },
  switch: {
    // flex: 1,
    alignItems: 'center',
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    // resizeMode: 'cover',
  },
});