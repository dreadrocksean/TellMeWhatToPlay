import { StackNavigator } from 'react-navigation';
import SetList from './components/SetList';
import Lyrics from './components/Lyrics';

const App = StackNavigator({
  SetList: { screen: SetList },
  Lyrics: { screen: Lyrics },
});

export default App;