const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.74)',
  },
  window: {
    width: '80%',
    minHeight: '50%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#281955',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  closeWrapper: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 34,
    height: 34,
  },
  close: {
    width: null,
    height: null,
    flex: 1,
  },
}

export default styles;