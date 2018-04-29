
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 15,
    marginBottom: 12,
  },
  box: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    width: 25,
    height: 25,
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
    fontSize: 11,
    fontFamily: 'montserrat-bold',
  },
});

export default styles;