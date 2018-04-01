import { StackNavigator, addNavigationHelpers, } from 'react-navigation';
import Options from './components/Options';
import { Provider } from 'unstated';
import ArtistAdmin from './components/ArtistAdmin';
import ArtistList from './components/ArtistList';
import SetList from './components/SetList';
import Lyrics from './components/Lyrics';


const AppRouteConfigs = {
  Options: { screen: Options },
  ArtistList: { screen: ArtistList },
  ArtistAdmin: { screen: ArtistAdmin },
  SetList: { screen: SetList },
  Lyrics: { screen: Lyrics },
}

const App = StackNavigator(AppRouteConfigs);

// const AppWithNavigationState = connect(state => ({
//     nav: state.nav,
// }))(({ dispatch, nav }) => (
//     <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
// ));

export default App;
// export default {AppWithNavigationState};