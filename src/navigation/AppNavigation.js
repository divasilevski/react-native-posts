import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookmarkScreen } from '../screens/BookmarkScreen';
import { THEME } from '../theme';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Post: {
      screen: PostScreen,
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'white',
      },
      headerTintColor: Platform.OS !== 'android' ? THEME.MAIN_COLOR : 'white',
    },
  }
);

const BookedNavigator = createStackNavigator(
  {
    Booked: BookmarkScreen,
    Post: PostScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'white',
      },
      headerTintColor: Platform.OS !== 'android' ? THEME.MAIN_COLOR : 'white',
    },
  }
);

const BottomNavigator = createBottomTabNavigator(
  {
    Post: {
      screen: PostNavigator,
      navigationOptions: {
        tabBarIcon: (info) => (
          <Ionicons name="ios-albums" size={25} color={info.tintColor} />
        ),
      },
    },
    Booked: {
      screen: BookedNavigator,
      navigationOptions: {
        tabBarIcon: (info) => (
          <Ionicons name="ios-star" size={25} color={info.tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: THEME.MAIN_COLOR,
    },
  }
);

export const AppNavigation = createAppContainer(BottomNavigator);
