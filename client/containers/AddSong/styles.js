const styles = {
  imageWrapper: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
  },
  autocomplete: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    fontSize: 20,
    padding: 5,
    height: 60,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  input: {
    fontSize: 20,
    padding: 5,
    height: 60,
    borderColor: '#7a42f4',
    borderWidth: 1,
    color: 'white',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#7a42f4',
    padding: 10,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  }
}

export default styles;