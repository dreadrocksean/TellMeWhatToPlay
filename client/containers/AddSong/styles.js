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
  dropdown: {
    backgroundColor: '#f3f3f3',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 260,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: '#dddddd',
    borderWidth: 2,
  },
  listHeading: {},
  listHeadingText: {
    textAlign: 'left',
    color: '#c4c4c4',
    fontSize: 11,
  },
  listItem: {
    borderColor: '#dddddd',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  listItemText: {
    color: '#9e9e9e',
    fontSize: 15,
    textAlign: 'left',
  },
  inputContainer: {
    width: '100%',
    zIndex: 1
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
    zIndex: 0,
  },
  submitButtonText:{
    color: 'white'
  }
}

export default styles;