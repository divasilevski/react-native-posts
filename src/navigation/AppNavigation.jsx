import React from "react";
import { Platform, TouchableWithoutFeedback } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { BookmarkScreen } from "../screens/BookmarkScreen";
import { THEME } from "../theme";
import { Ionicons } from "@expo/vector-icons";

const options = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "white",
  },
  headerTintColor: Platform.OS !== "android" ? THEME.MAIN_COLOR : "white",
};

const toggleMenuOptions = (navigation) => ({
  headerLeft: (info) => (
    <TouchableWithoutFeedback onPress={navigation.toggleDrawer}>
      <Ionicons
        name="menu"
        size={25}
        color={info.tintColor}
        style={{ marginRight: 26 }}
      />
    </TouchableWithoutFeedback>
  ),
});

const Stack = createNativeStackNavigator();

const PostNavigator = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      component={MainScreen}
      options={{
        ...options,
        ...toggleMenuOptions(navigation),
      }}
    />
    <Stack.Screen name="Post" component={PostScreen} options={options} />
  </Stack.Navigator>
);

const BookedNavigator = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Booked"
      component={BookmarkScreen}
      options={{
        ...options,
        ...toggleMenuOptions(navigation),
      }}
    />
    <Stack.Screen name="Post" component={PostScreen} options={options} />
  </Stack.Navigator>
);

const Tab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const TabsNavigator = () => (
  <Tab.Navigator
    shifting={true}
    barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
  >
    <Tab.Screen
      name="Все"
      component={PostNavigator}
      options={{
        headerShown: false,
        tabBarActiveTintColor:
          Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
        tabBarIcon: (info) => (
          <Ionicons name="ios-albums" size={25} color={info.color} />
        ),
      }}
    />
    <Tab.Screen
      name="Избранное"
      component={BookedNavigator}
      options={{
        headerShown: false,
        tabBarActiveTintColor:
          Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
        tabBarIcon: (info) => (
          <Ionicons name="ios-star" size={25} color={info.color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Drawer = createDrawerNavigator();

const MainNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerActiveTintColor: THEME.MAIN_COLOR,
      drawerLabelStyle: {
        fontFamily: "open-bold",
      },
    }}
  >
    <Drawer.Screen
      name="Мои посты"
      component={TabsNavigator}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name="Новый пост"
      component={CreateScreen}
      options={options}
    />
    <Drawer.Screen
      name="О приложении"
      component={AboutScreen}
      options={options}
    />
  </Drawer.Navigator>
);

export const AppNavigation = () => (
  <NavigationContainer>
    <MainNavigator />
  </NavigationContainer>
);
