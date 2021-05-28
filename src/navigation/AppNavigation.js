import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { THEME } from '../theme';

const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Post: {
      screen: PostScreen,
    },
    About: AboutScreen,
  },
  {
    initialRouteName: 'About',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'white',
      },
      headerTintColor: Platform.OS !== 'android' ? THEME.MAIN_COLOR : 'white',
    },
  }
);

export const AppNavigation = createAppContainer(PostNavigator);
