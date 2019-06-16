import {createStackNavigator, createAppContainer} from 'react-navigation';
import Signin from './Components/Signin';
import Login from './Components/Login';
import Home from './Components/Home';
import HomeSnap from './Components/HomeSnap';
import SendSnap from './Components/SendSnap';
import ReadSnap from './Components/ReadSnap';
import Camera from './Components/Camera';

const MainNavigator = createStackNavigator({
  Home: { screen : Home},
  Signin: {screen: Signin},
  Login: {screen: Login},
  HomeSnap: {screen: HomeSnap},
  SendSnap: {screen: SendSnap},
  ReadSnap: {screen: ReadSnap}, 
  Camera: {screen: Camera}
});

const App = createAppContainer(MainNavigator);

export default App;