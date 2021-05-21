import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookmarksScreen from '../screens/BookmarksScreen';

const MainFlow = () => {
  const { Navigator, Screen } = createBottomTabNavigator();
  return (
    <Navigator>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={20} />
          ),
        }}
      />
      <Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="bookmark" color={color} size={20} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={20} />
          ),
        }}
      />
    </Navigator>
  );
};

export default MainFlow;
