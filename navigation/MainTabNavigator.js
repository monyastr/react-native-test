import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ExchangeScreen from "../screens/ExchangeScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

const ExchangeStack = createStackNavigator({
  Exchange: ExchangeScreen
});

ExchangeStack.navigationOptions = {
  tabBarLabel: "Exchange",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-trending-up"}
    />
  )
};

export default createMaterialTopTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack,
    ExchangeStack
  },
  {
    initialRouteName: "HomeStack",
    navigationOptions: {
      swipeEnabled: true,
      animationEnabled: true,
      scrollEnabled: true
    },
    tabBarOptions: {
      activeTintColor: "#2e78b7",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "#EEEEEE"
      },
      showIcon: true,
      showLabel: true,
      labelStyle: {
        fontSize: 10,
      },
    },
    tabBarPosition: "bottom"
  }
);
