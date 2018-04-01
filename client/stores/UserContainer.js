import { Container } from 'unstated';

class UserContainer extends Container {
  state = {
    user: {},
    authorized: false,
    artist: {},
  }

  setUser = user => {
    this.setState({ user })
  }

  setArtist = artist => {
    this.setState({ artist })
  }

  authorize = auth => {
    this.setState({authorized: auth})
  }
}

export {
  UserContainer
}