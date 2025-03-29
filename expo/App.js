import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import HomePage from './components/HomePage';
import Loading from './components/Loading';
import Camera from './components/Camera';
import PhotoResult from './components/PhotoResult';
import Welcome from './components/Welcome';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...'], (isAffected, bundle) => {
  return isAffected || bundle.includes('example.js');
});

console.disableYellowBox = true;

const App = createStackNavigator({
    Loading                     : { screen: Loading }, 
    HomePage                    : { screen: HomePage },
    Camera                      : { screen: Camera },
    PhotoResult                 : { screen: PhotoResult },
    Welcome                     : { screen: Welcome }
  },
  {
    initialRouteName: 'Loading',
  }
);
export default createAppContainer(App);