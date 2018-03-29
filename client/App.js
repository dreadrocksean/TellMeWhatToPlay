import { StackNavigator } from 'react-navigation';
import Options from './components/Options';
import ArtistAdmin from './components/ArtistAdmin';
import ArtistList from './components/ArtistList';
import SetList from './components/SetList';
import Lyrics from './components/Lyrics';

const App = StackNavigator({
  Options: { screen: Options },
  ArtistList: { screen: ArtistList },
  ArtistAdmin: { screen: ArtistAdmin },
  SetList: { screen: SetList },
  Lyrics: { screen: Lyrics },
});

export default App;