import { StyleSheet } from 'react-native';
import listItemStyle from '../ListItem/styles';

const iconSize = 40;

export const styles = StyleSheet.create({
  ...listItemStyle,
  gImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  image: {
    width: iconSize,
    height: iconSize,
  },
  iconTint: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    backgroundColor: 'green',
    opacity: 0.4,
  },
  scoreIcon: {
    width: iconSize * 0.4,
    height: iconSize * 0.4,
    marginBottom: 4,
  },
  voteIcon: {
    marginRight: 36,
  },
  scoreContainer: {
    position: 'absolute',
    right: 0,
    height: iconSize,
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,255,0.3)',
  },
  text: {
    fontWeight: 'normal',
    textAlign: 'left',
    fontFamily: 'montserrat-regular',
  },
  score: {
    flexDirection: 'row',
    backgroundColor: '#fcc819',
    height: iconSize / 2,
    width: 70,
    borderRadius: iconSize * 0.875,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  scoreText: {
    color: 'white',
    fontSize: iconSize * 0.3,
    fontWeight: 'bold',
    marginTop: -3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    // backgroundColor: 'rgba(0,0,255,0.3)',
  },
});


