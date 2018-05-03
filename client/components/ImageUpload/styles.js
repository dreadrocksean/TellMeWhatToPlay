
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f3f3f3',
    width: 150,
    height: 150,
    borderRadius: 150,
    padding: 30,
    overflow: 'hidden',
  },
  icon: {
    // flex: 1,
    width: '45%',
    opacity: 0.9,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 14,
    color: '#bbbbbb',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default styles;