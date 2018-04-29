
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    borderColor: '#ebca0b',
    borderWidth: 3,
    borderRadius: 22,
    width: 22,
    height: 22,
    padding: 3,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  label: {
    marginLeft: 7,
  },
  labelText: {
    color: '#f3f3f3',
    fontSize: 10,
    fontFamily: 'montserrat-bold',
  },
});

export default styles;