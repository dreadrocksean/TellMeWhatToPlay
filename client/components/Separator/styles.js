
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  hr: {
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(220,220,255,0.2)',
    flex: 10,
  },
  label: {
    flex: 5,
  },
  labelText: {
    fontSize: 13,
    fontFamily: 'montserrat-bold',
    color: 'rgba(220,220,255,0.7)',
  },
});

export default styles;