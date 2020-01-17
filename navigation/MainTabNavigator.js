import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import WebViewScreen from '../screens/WebViewScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    WebView: WebViewScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const ScannerStack = createStackNavigator(
  {
    Scanner: ScannerScreen,
  },
  config
);

ScannerStack.navigationOptions = {
  tabBarLabel: 'Scanner',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} 
    name={
      Platform.OS === 'ios' 
        ? 'ios-camera' : 'md-camera'} />
  ),
};

ScannerStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ScannerStack,
});

tabNavigator.path = '';

export default tabNavigator;
