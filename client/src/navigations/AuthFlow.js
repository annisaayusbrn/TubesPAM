import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AuthFlow = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
    </Navigator>
  );
};

export default AuthFlow;
